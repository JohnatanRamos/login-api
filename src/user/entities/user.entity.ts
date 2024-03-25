import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { Role } from "./role.entity";

@Schema()
export class User extends Document {
    @Prop()
    name: string;

    @Prop()
    lastName: string;

    @Prop({ unique: true })
    email: string;

    @Prop()
    password: string;

    @Prop()
    state: boolean;

    @Prop({ type: Types.ObjectId, ref: Role.name })
    role: Role | Types.ObjectId;

    @Prop()
    createdAt: Date;

    @Prop({ type: Date, default: Date.now })
	updatedAt: Date;

    @Prop({ type: Types.ObjectId, ref: User.name })
    updateBy: User | Types.ObjectId;
}

export const UserSchema = SchemaFactory.createForClass(User);