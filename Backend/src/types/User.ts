export interface UserAttributes {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  image?: string | null;
  isSeller: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

