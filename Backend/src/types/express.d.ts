import { User } from "./User.ts"


declare global {
    namespace Express {
        interface Request {
            user?: User;
        }
    }
}