export const isBot = (message: Message) => message.sender === "bot";
export const isMe = (message: Message) => message.sender === "me";
