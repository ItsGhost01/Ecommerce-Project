export interface User {
    id: number;
    firstName: string;
    lastName?: string;
    email: string;
    image: string | null;
    isSeller: boolean;
    createdAt?: string;
    updatedAt?: string;
}