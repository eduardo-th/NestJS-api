import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v2 as Cloudinary, UploadApiErrorResponse, UploadApiResponse } from 'cloudinary'
import { Readable } from 'stream'

@Injectable()
export class CloudinaryService {
    constructor(private configServide: ConfigService) { }

    async uploadToCloudinary(image: Express.Multer.File): Promise<UploadApiErrorResponse | UploadApiResponse> {
        return new Promise((resolve, reject) => {
            const imageStream = Cloudinary.uploader.upload_stream({
                folder: this.configServide.get('CLOUDINARY_FOLDER')
            }, function (err, result) {
                if (err) {
                    return reject(err)
                }
                return resolve(result)
            })
            Readable.from(image.buffer).pipe(imageStream)
        })
    }
}