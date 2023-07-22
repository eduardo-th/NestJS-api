import { Module } from '@nestjs/common';
import { CloudinaryService } from './cloudinary.service';
import { v2 as Cloudinary } from 'cloudinary'

@Module({
  providers: [{
      provide: `${process.env.CLOUDINARY_PROVIDER_TOKEN}`,
      useFactory: () => {
          return Cloudinary.config({
              cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
              api_key: process.env.CLOUDINARY_API_KEY,
              api_secret: process.env.CLOUDINARY_API_SECRET,
          });
      },  
  },CloudinaryService],
  exports: [ CloudinaryService]
})
export class CloudinaryModule {}
