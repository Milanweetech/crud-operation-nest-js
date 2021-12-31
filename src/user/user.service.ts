import { Injectable, Logger } from '@nestjs/common';
import { User, UserDocument } from './user.entity';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { SignUpRequestDTO } from 'src/dto/signup.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  //create user
  async createUser(signupRequestDto: SignUpRequestDTO): Promise<UserDocument> {
    const user = await this.userModel.findOne({
      email: signupRequestDto.email,
    });
    if (!user) {
      return null;
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(signupRequestDto.password, salt);
      const newUser = await this.userModel.create({
        ...signupRequestDto,
        password: hashPassword,
      });
      return newUser;
    }
  }

  //update user
  async updateUser(id: string, user: SignUpRequestDTO): Promise<UserDocument> {
    const updateUser = await this.userModel.findOneAndUpdate(
      { _id: new Types.ObjectId(id) },
      {
        $set: {
          ...user,
        },
      },
    );
    return updateUser;
  }

  //findByEmail
  async findByEmail(email: string) {
    const user = await this.userModel.findOne({ email: email });
    return user;
  }

  //get all users
  async getUser() {
    const user = await this.userModel.find({});

    return user;
  }

  //delete user
  async deleteUser(id): Promise<any> {
    const deleteUser = await this.userModel.updateOne(
      { _id: id },
      { $set: { isDeleted: true } },
    );
    return deleteUser;
  }
}
