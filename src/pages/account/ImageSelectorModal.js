import { Close } from '@mui/icons-material';
import {  Dialog,  IconButton } from '@mui/material';

const ImageSelectorModal = ({ setOpend, setselectedImages, open, onClose, images }) => {

  const toggleImageSelection = (image) => {
    setselectedImages([image]);
    setOpend(false)
  };
  return (
    
      <Dialog
      open={open}
        className="!w-fit !m-1 !mt-2">
        <IconButton className=' !flex !justify-end'>
          <Close onClick={onClose} />
        </IconButton>
     <h2 className='py-2 text-center font-bold'>Select Images</h2>
          <div className=" grid grid-cols-3  !justify-center  ">
            {images.map((image, index) => (
              <div key={index} className="">
                <img
                  onClick={() => toggleImageSelection(image)}
                  src={image} alt={`Image ${index}`} className='w-28 h-28 rounded-full !p-2' />

              </div>
            ))}
          </div>


      </Dialog>
    
  );
};

export default ImageSelectorModal
