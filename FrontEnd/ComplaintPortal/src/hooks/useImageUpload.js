import { useState } from 'react';

export default function useImageUpload() {
  const [images, setImages] = useState({
                                        Image1: null,
                                        Image2: null,
                                        Image3: null,
                                      });

  const handleImageChange = (e) => {
    const { name, files } = e.target;
    setImages((prev) => ({ ...prev, [name]: files[0] }));
  };

  return { images, handleImageChange };
}
