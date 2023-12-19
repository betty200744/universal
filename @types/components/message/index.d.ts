declare const Message: {
success: (text: string, delay?: number) => void;
error: (text: string, delay?: number) => void;
warning: (text: string, delay?: number) => void;
};
export default Message;
