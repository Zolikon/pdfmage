import { useRef, useState } from "react";
import PropTypes from "prop-types";

const ImageUploader = ({ setNewImage, close }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const inputRef = useRef(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    file && setSelectedImage(URL.createObjectURL(file), file.name);
  };

  const handleAcceptImage = () => {
    setNewImage(selectedImage, "");
    setSelectedImage(null);
    inputRef.current.value = null;
    close();
  };

  const handleRejectImage = () => {
    setSelectedImage(null);
    inputRef.current.value = null;
    close();
  };

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="border border-gray-300 rounded-md p-2 mt-2"
      />
      {selectedImage && (
        <div className="flex flex-col gap-2">
          <img src={selectedImage} alt="Uploaded Image" />
          <div className="flex flex-row justify-between items-center">
            <button className=" h-12 aspect-square rounded bg-green-500 text-white" onClick={handleAcceptImage}>
              OK
            </button>
            <button className=" h-12 aspect-square rounded bg-red-500 text-white" onClick={handleRejectImage}>
              Drop
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

ImageUploader.propTypes = {
  setNewImage: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired,
};

export default ImageUploader;
