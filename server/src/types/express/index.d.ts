import { IUser } from "../../interfaces/IUser";

declare module "express" {
  export interface Request {
    user?: IUser;
  }
}
