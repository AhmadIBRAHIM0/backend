import {Role} from "../users/user-role.enum";

export interface IAuthResponse {
    accessToken: string;
    role: Role;
    email: string;

}