import Image, { ImageProps } from 'next/image';
import * as React from 'react';
import { useEffect, useState } from 'react';

type ImageWithFallbackProps = ImageProps &
  (
    | {
        fallbackSrc: string;
        fallbackComponent?: never;
      }
    | { fallbackSrc?: never; fallbackComponent: FallbackComponentType }
  );

type FallbackComponentType = 'StoryReadMainImage';

const fallbackComponentImageMap = {
  'StoryReadMainImage': '/images/empty_photo_1.svg'
};

export const ImageWithFallback = ({
  src,
  fallbackSrc,
  alt,
  fallbackComponent,
  ...rest
}: ImageWithFallbackProps) => {
  const [imgSrc, setImgSrc] = useState(src);

  useEffect(() => {
    setImgSrc(src);
  }, [src]);

  return (
    <Image
      {...rest}
      alt={alt}
      src={imgSrc}
      onError={() => {
        if (fallbackComponent) {
          setImgSrc(fallbackComponentImageMap[fallbackComponent]);
        } else {
          setImgSrc(fallbackSrc);
        }
      }}
    />
  );
};

export const shouldNotForwardProp = (...args: string[]) => ({
  shouldForwardProp: (propName: string) => !args.includes(propName)
});
