export class HandlebarsHelper {

    /**
     * @param the value to log.
     */
    static log(value) {
        console.log(value);
    }

    /**
     * @param html The textual content to display.
     * @returns The html content to display.
     */
    static html(html) {
        return new Handlebars.SafeString(html);
    }

}