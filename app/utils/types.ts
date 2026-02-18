export type Message = {
    description: string;
    color: 'error' | 'success' | 'primary' | 'secondary' | 'info' | 'warning' | 'neutral';
    icon: string;
};
