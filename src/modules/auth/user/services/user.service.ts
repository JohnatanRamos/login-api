import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../entities/user.entity';
import { IRequestResponse } from 'src/shared/interfaces/IRequestResponse.interface';
import { buildResponseSuccess } from 'src/shared/utils/Response.util';
import { encrypt, comparePassword } from 'src/shared/functions/encryptPassword.function';
import { IUser } from '../interfaces/IUser.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}

  /**
   * Method responsible for creating a user.
   * @param {AddUserDto} user - Information user.
   * @returns {Promise<IRequestResponse>} - Response method.
   */
  async addUser(user: IUser): Promise<IRequestResponse> {
    //Validate user by email.
    const EXIST_USER = await this.findUser({ email: user.email });

    if (EXIST_USER) {
      throw new HttpException(
        'The email user is already registered.',
        HttpStatus.BAD_REQUEST,
      );
    }

    //Encrypt password.
    const PASSWORD = await encrypt(user?.password);
    //Save user.
    const NEW_USER = new this.userModel({
      ...user,
      createdAt: new Date(),
      password: PASSWORD,
    });
    await NEW_USER.save();

    return buildResponseSuccess({ code: 201, data: true });
  }

  /**
   * Method responsible for obtaining all users.
   * @returns {Promise<IRequestResponse>} - Response method.
   */
  async getAllUsers(): Promise<IRequestResponse> {
    return buildResponseSuccess({
      data: await this.userModel
        .find({}, { password: 0 })
        .sort({ createdAt: -1 }),
    });
  }

  /**
   *  Method responsible for update a user.
   * @param {UpdateUserDto} userToUpdate - User information to update.
   * @returns {Promise<IRequestResponse>} - Response method.
   */
  async updateUser(userToUpdate: IUser): Promise<IRequestResponse> {
    //validate user by _id.
    const EXIST_USER = await this.findUser({
      _id: userToUpdate._id,
    });

    if (!EXIST_USER) {
      throw new HttpException(
        'The user does not exist.',
        HttpStatus.BAD_REQUEST,
      );
    }

    //Validate user by email.
    const EXIST_EMAIL = await this.findUser({ email: userToUpdate.email, $nor: [{ _id: userToUpdate._id }] });

    if (EXIST_EMAIL) {
      throw new HttpException(
        'The email user is already registered.',
        HttpStatus.BAD_REQUEST,
      );
    }

    //Update user.
    await this.userModel.findByIdAndUpdate(userToUpdate._id, userToUpdate, {
      new: true,
    });

    return buildResponseSuccess({
      data: userToUpdate,
    });
  }

  /**
   * Function generic to verify that the user is not registered.
   * @param {any} objSearch - Objection to search.
   * @returns {Promise<{_id}>} - A _id if the user exists.
   */
  private async findUser(objSearch: any): Promise<{ _id }> {
    return this.userModel.findOne(objSearch);
  }

  async changePassword({currentPassword, newPassword, idUser}) {
    const user = await this.userModel.findById(idUser);

    if (!user) {
      throw new HttpException(
        'The user does not exist.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const correctPassword = await comparePassword(currentPassword, user.password);

    if (!correctPassword) {
      throw new HttpException(
        'The password does not match.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const PASSWORD = await encrypt(newPassword);

    await this.userModel.findByIdAndUpdate(idUser, {
      $set: {
        password: PASSWORD
      }
    });

    return buildResponseSuccess({
      data: true,
      msg: "The password change was successful."
    });
  }
}
