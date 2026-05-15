export interface User {
    id: number;
    name: string;
    email: string;
    roles?: string[];
    avatar?: string;
    phone?: string;
}
