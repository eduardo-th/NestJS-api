import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

@Schema({_id: false})
class Avatar extends Document{

    @Prop({default: 'https://res.cloudinary.com/dqfvb6su5/image/upload/v1666904254/social-media/avatars/mustache2_ptqjy3.jpg'})
    url: string
    
    @Prop({default: ''})
    filename: string

}
const avatarSchema = SchemaFactory.createForClass(Avatar)

@Schema({
    timestamps: true,
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
})
export class User extends Document{

    @Prop({required: true, unique: true})
    username: string

    @Prop({required: true})
    password: string

    @Prop({required: true, unique: true})
    email: string

    @Prop({default: 'somthing about me'})
    about: string

    @Prop({type: avatarSchema, default: {}})
    avatar: Avatar

    @Prop({type:[{ type: mongoose.Schema.Types.ObjectId, ref: 'User'}]})
    followers: User[]

    @Prop({type:[{ type: mongoose.Schema.Types.ObjectId, ref: 'User'}]})
    follows: User[]
}
export const UserSchema = SchemaFactory.createForClass(User)