export class Chat {

    /**
     * Constructor.
     * @param actor The emiter of the chat message.
     */
    constructor(actor) {
        this.actor = actor;
        this.chat = null;
        this.content = null;
        this.template = null;
        this.data = null;
        this.flags = null;
        this.roll = null;
    }

    /**
     * Sets the specified message content.
     * @param content The content to set.
     * @returns the instance.
     */
    withContent(content) {
        this.content = content;
        return this;
    }

    /**
     * Sets the specified template used to create the message content.
     * @param template The path of the file template to set.
     * @returns the instance.
     */
    withTemplate(template) {
        this.template = template;
        return this;
    }

    /**
     * Sets the specified data used to create the message content.
     * @param data The data of the file template to set.
     * @returns the instance.
     */
    withData(data) {
        this.data = data;
        return this;
    }

    /**
     * Sets the flags parameter.
     * @param flags The flags parameter to set.
     * @returns the instance.
     */
    withFlags(flags) {
        this.flags = flags;
        return this;
    }

    /**
     * Indicates if the chat is a roll.
     * @param roll The roll.
     * @returns the instance.
     */
    withRoll(roll) {
        this.roll = roll;
        return this;
    }

    /**
     * Creates the chat message.
     * @return this instance.
     */
    async create() {

        // Retrieve the message content
        if (!this.content && this.template && this.data) {
            this.content = await this._createContent();
        }

        // Exit if message content can't be created
        if (!this.content) {
            return null;
        }

        // Create the chat data
        const data = {
            user: game.user.id,
            speaker: {
                actor: this.actor.id,
                alias: this.actor.name,
                scene: null,
                token: null,
            },
            content: this.content
        }

        // Set the roll parameter if necessary
        if (this.roll) {
            data.rolls = [];
            data.rolls.push(this.roll);
        }

        // Set the flags parameter if necessary
        if (this.flags) {
            data.flags = this.flags;
        }

        // Set the whisper and blind parameters according to the player roll mode settings
        switch (game.settings.get('core', 'rollMode')) {
            case 'gmroll':
                data.whisper = Chat.getWhisperRecipients('GM').map((u) => u.id);
                break;
            case 'blindroll':
                data.whisper = Chat.getWhisperRecipients('GM').map((u) => u.id);
                data.blind = true;
                break;
            case 'selfroll':
                data.whisper = [game.user.id];
                break;
        }

        // Create the chat
        this.chat = await ChatMessage.create(data);
        return this;

    }

    /**
     * Create the message content from the registered template.
     * @returns the message content or null if an error occurs.
     */
    async _createContent() {

        // Update the data to provide to the template
        const data = foundry.utils.duplicate(this.data);
        data.owner = this.actor.id;

        // Call the template renderer.
        return await renderTemplate(this.template, data);

    }

}