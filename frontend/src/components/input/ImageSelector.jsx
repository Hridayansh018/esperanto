import { useEffect, useRef, useState } from 'react';
import { FaRegFileImage } from 'react-icons/fa6';
import { MdDeleteOutline } from 'react-icons/md';

const ImageSelector = ({ image, setImage, handleDeleteImg }) => {
  const inputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleRemoveChange = () => {
    setImage(null); // Reset the image in parent
    setPreviewUrl(null); // Reset the preview URL
    handleDeleteImg(); // Call parent delete handler
  };

  const onChooseFile = () => {
    inputRef.current.click();
  };

  useEffect(() => {
    if (typeof image === 'string') {
      setPreviewUrl(image);
    }
  }, [image]);

  return (
    <div className=''>
      <input
        type="file"
        accept='image/*'
        ref={inputRef}
        onChange={handleImageChange}
        className='hidden'
      />

      {!image ? (
        <button
          className='w-full h-[220px] flex flex-col items-center justify-center gap-4 bg-slate-50 rounded border border-slate-200/50'
          onClick={onChooseFile}
        >
          <div className='w-14 h-14 flex items-center justify-center bg-cyan-100 rounded-full border border-cyan-300'>
            <FaRegFileImage className='text-xl text-cyan-500' />
          </div>
          <p className='text-sm text-slate-500'>Browse image file to upload</p>
        </button>
      ) : (
        <div className='w-full relative'>
          <img src={previewUrl} alt="Selected" className='w-full h-[300px] object-cover rounded-lg' />
          <button className='btn-delete absolute top-2 right-2' onClick={handleRemoveChange}>
            <MdDeleteOutline className='text-lg' />
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageSelector;
