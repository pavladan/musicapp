import { IUser } from "../api/models/Users";

declare module "express" {
  export interface Request {
    user?: IUser;
  }
}
