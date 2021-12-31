import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Role } from './role.enum';

export type UserDocument = User & Document;

@Schema({ versionKey: false, timestamps: true })
export class User {
  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  phoneNo: string;

  @Prop({ required: true, default: Role.User })
  role: Role;

  @Prop({ require: true })
  password: string;

  @Prop({ default: false, type: Boolean })
  isDeleted?: boolean;
}

const UserSchema = SchemaFactory.createForClass(User);
export { UserSchema };
