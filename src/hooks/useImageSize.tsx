import { useState, useEffect } from "react";

interface ImageSize {
  width: number;
  height: number;
}

const useImageSize = (imageUrl: string): ImageSize | null => {
  const [imageSize, setImageSize] = useState<ImageSize | null>(null);

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setImageSize({ width: img.width, height: img.height });
    };
    img.src = imageUrl;
  }, [imageUrl]);

  return imageSize;
};

export default useImageSize