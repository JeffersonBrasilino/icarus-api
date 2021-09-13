export class MessageContext {
    private static context = {};

    public static setContext(name, value) {
       MessageContext.context[name] = value;
    }

    public static getContextByName(name: string) {
        return MessageContext.context[name];
    }

    public static getAllContext(){
        return MessageContext.context;
    }
}