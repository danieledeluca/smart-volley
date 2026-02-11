export type MessageType = 'success' | 'warning' | 'error';

export type Message = {
    text: string;
    type: MessageType;
};
