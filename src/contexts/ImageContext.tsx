import { FC, ReactNode, useContext, createContext } from 'react';
import { useImage } from '@/hooks/useImage'
import { EventType } from '@/interfaces/event';

type Props = {
  children: ReactNode;
};

interface ImageContextType {
  imageUrl: string | undefined
  imageUpload: EventType['onChangeInput']
}

const ImageContext = createContext({} as ImageContextType);

export const ImageProvider: FC<Props> = ({ children }) => {

  const { imageUrl, imageUpload } = useImage();

  return (
    <ImageContext.Provider
      value={{
        imageUrl,
        imageUpload
      }}
    >
      {children}
    </ImageContext.Provider>
  );

};

export const useImageContext = () => useContext(ImageContext);
