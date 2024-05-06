import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';

@Injectable()
export class AttachmentsService {
  async s3Upload(file, data) {
    const AWS_S3_BUCKET = 'cardtogoapp';
    const s3 = new AWS.S3({
      accessKeyId: 'AKIAVQULNWV5XEHJBJON',
      secretAccessKey: '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',
      region: 'us-east-1',
    });
    const params = {
      Bucket: AWS_S3_BUCKET,
      Key: data.name != undefined ? `${data.name}/${file['originalname']}` : `${data}/card/${file['originalname']}`,
      Body: file.buffer,
      ACL: 'public-read',
      ContentType: file['mimetype'],
      ContentDisposition: 'inline',
      CreateBucketConfiguration: {
        LocationConstraint: 'ap-south-1',
      },
    };
    const s3Response = await s3.upload(params).promise();
    return s3Response.Location;
  }
}
