
import { useMemo, useState, useCallback, useEffect,  SetStateAction, Dispatch } from 'react';
import { ProductType, RegisterProductParams } from '@/interfaces/product';
import { EventType } from '@/interfaces/event';
import { registerProductApi } from '@/apis/productApi';
import { useRouter } from 'next/router';
import { NAVIGATION_PATH } from '@/constants/navigation';
import AWS from 'aws-sdk';


type Params = {
  registerProduct: (params: RegisterProductParams) => Promise<void>
}

type StatesType = {
  title: string
  description?: string
  imageUrl?: string
  categoryId: number
};

const S3_BUCKET = process.env.S3_BUCKET_NAME;
const REGION = process.env.REGION;

AWS.config.update({
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  region: REGION
});

const myBucket = new AWS.S3({
  params: { Bucket: S3_BUCKET },
  region: REGION,
});

type ActionsType = {
  handleRegisterProduct: EventType['onSubmit'];
  handleChangeTitle: EventType['onChangeInput'];
  handleChangeDescription: EventType['onChangeInput'];
  handleChangeImageUrl: EventType['onChangeInput'];
  handleChangeCategoryId: EventType['onChangeSelect'];
  imageUpload: EventType['onChangeInput']
};

export const useProductRegistTemplate = ({registerProduct}: Params) => {
  const router = useRouter();
  const [ title, setTitle ] = useState<string>('');
  const [ description, setDescription ] = useState<string| undefined>(undefined);
  const [ imageUrl, setImageUrl ] = useState<string | undefined>(undefined);
  const [ categoryId, setCategoryId ] = useState<number>(0);

  const handleChangeTitle: EventType['onChangeInput'] = useCallback((event) => setTitle(event.target.value), []);
  const handleChangeDescription: EventType['onChangeInput'] = useCallback((event) => setDescription(event.target.value), []);
  const handleChangeImageUrl: EventType['onChangeInput'] = useCallback((event) => setImageUrl(event.target.value), []);
  const handleChangeCategoryId: EventType['onChangeSelect'] = useCallback((event) => setCategoryId(Number(event.target.value)), []);

  const handleRegisterProduct: EventType['onSubmit'] = useCallback(
    async (e) => {
      e.preventDefault();
      if (title !== '' && categoryId) {
        registerProduct({
          product_title: title,
          product_description: description,
          image_url: imageUrl,
          category_id: categoryId
        });
        router.push(NAVIGATION_PATH.TOP);
      }
    },
    [registerProduct, title, description, imageUrl, categoryId, router]
  );

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
  )

  const states: StatesType = {
    title,
    description,
    imageUrl,
    categoryId
  };

  const actions: ActionsType = {
    handleRegisterProduct,
    handleChangeTitle,
    handleChangeDescription,
    handleChangeImageUrl,
    handleChangeCategoryId,
    imageUpload
  };

  return [states, actions] as const;
}
