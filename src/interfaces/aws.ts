import AWS from 'aws-sdk';

export const S3_BUCKET = process.env.S3_BUCKET_NAME;
export const REGION = process.env.REGION;

AWS.config.update({
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  region: REGION
});
