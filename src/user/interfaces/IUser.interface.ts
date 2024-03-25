import { UpdateUserDto } from "../dto/update-user.dto";

export interface IUser extends Omit<UpdateUserDto, "_id"> {
    _id?: string;
    password?: string;
}