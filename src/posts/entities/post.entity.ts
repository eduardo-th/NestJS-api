import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

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

  /*
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Author', required: true  })
    author: Author--->author schema
   

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }] })
    comments: Comment[]--->comments schema

*/
}

export const PostSchema = SchemaFactory.createForClass(Post);
