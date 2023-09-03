export class HandlebarsHelper {

    /**
     * @param html The textual content to display.
     * @returns The html content to display.
     */
    static html(html) {
        return new Handlebars.SafeString(html);
    }

    /**
     * @param content The intial content.
     * @param owner   The document owner.
     * @returns the enriched HTML content with links and secret contents.
     */
    static enrichHTML(content, owner) {
        return TextEditor.enrichHTML(content, {secrets: owner, async: false});
    }

}