export interface User {
    id: number;
    firstName: string;
    lastName?: string;
    email: string;
    image: string | null;
    isSeller: boolean;
    isAdmin: boolean;
    createdAt?: string;
    updatedAt?: string;
}