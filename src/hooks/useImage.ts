import{ useState, useCallback } from 'react';
import { EventType } from '@/interfaces/event';
import { S3_BUCKET, REGION } from '@/interfaces/aws';
import AWS from 'aws-sdk';


export const useImage = () => {

const [ imageUrl, setImageUrl ] = useState<string | undefined>(undefined);

const myBucket = new AWS.S3({
  params: { Bucket: S3_BUCKET },
  region: REGION,
});

const imageUpload: EventType['onChangeInput'] = useCallback(
  async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const files = e.target.files;
    const fileObject = files ? files[0] : null;
    if (!fileObject) {
      console.error("No file selected");
      return;
    }
    const params = {
      ACL: 'public-read',
      Body: fileObject,
      Bucket: S3_BUCKET,
      ContentType: fileObject.type,
      Key: fileObject.name
    };

    try {
      myBucket.putObject(params)
        .on('httpUploadProgress', (evt) => {
          console.log(evt.loaded);
          // Assuming there's a state or context to update progress
          // setProgress(Math.round((evt.loaded / evt.total) * 100));
        })
        .send((err, data) => {
          if (err) {
            console.error("Upload Error:", err);
            throw err;
          } else {
            console.log("Upload Success", data);
            const imageUrl = `https://${S3_BUCKET}.s3.${REGION}.amazonaws.com/${encodeURIComponent(params.Key)}`;
            console.log("Uploaded Image URL:", imageUrl);
            // Assuming there's a state or context to update the image URL
            setImageUrl(imageUrl);
          }
        });
    } catch (err) {
      console.error(err);
    }
  },
  [imageUrl]
);

  return {
    imageUrl,
    imageUpload
  }

}
