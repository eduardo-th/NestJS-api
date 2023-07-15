import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Comment } from 'src/comments/entities/comment.entity';
import { User } from 'src/users/entities/user.entity';

@Schema({ _id: false })
export class Image extends Document {
  @Prop({ default: '' })
  url: string;

  @Prop({ default: '' })
  filename: string;
}
const ImageSchema = SchemaFactory.createForClass(Image);

@Schema({
  timestamps: true,
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
})
export class Post extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  body: string;

  @Prop({ type: [String], required: true })
  tags: String[];

  @Prop({ type: ImageSchema })
  image: Image;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Usert', required: true })
  author: User;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }] })
  comments: Comment[];
}

export const PostSchema = SchemaFactory.createForClass(Post);
