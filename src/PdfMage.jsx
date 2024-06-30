import { useRef, useState } from "react";

import Loader from "./Loader";
import { generatePDF } from "./fileUtils";
import { QualitySelector } from "./QualitySelector";
import PictureActionButton from "./PictureActionButton";

function PdfMage() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);
  const [quality, setQuality] = useState("NORMAL");

  async function handleImageUpload(event) {
    const newImages = Array.from(event.target.files).map(async (file) => {
      const blob = await fetch(URL.createObjectURL(file)).then((response) => response.blob());
      const blobUrl = URL.createObjectURL(blob);
      return {
        url: blobUrl,
        name: file.name,
      };
    });
    Promise.all(newImages).then((values) => {
      setImages((current) => [...current, ...values]);
      inputRef.current.value = null;
    });
  }

  async function downloadPDF() {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    setLoading(true);
    try {
      await generatePDF(images, quality).then(() => scrollToTop());
    } finally {
      setLoading(false);
    }
  }

  function handleImageDelete(index) {
    setImages((current) => current.filter((_, i) => i !== index));
  }

  function moveImageBackward(index) {
    if (index < images.length - 1) {
      const updatedImages = [...images];
      const temp = updatedImages[index];
      updatedImages[index] = updatedImages[index + 1];
      updatedImages[index + 1] = temp;
      setImages(updatedImages);
    }
  }

  function moveImageForward(index) {
    if (index > 0) {
      const updatedImages = [...images];
      const temp = updatedImages[index];
      updatedImages[index] = updatedImages[index - 1];
      updatedImages[index - 1] = temp;
      setImages(updatedImages);
    }
  }

  function moveImageToTheEnd(index) {
    if (index < images.length - 1) {
      let updatedImages = [...images];
      const temp = updatedImages[index];
      updatedImages = updatedImages.filter((_, i) => i !== index);
      updatedImages[images.length - 1] = temp;
      setImages(updatedImages);
    }
  }

  function moveImageToTheStart(index) {
    if (index > 0) {
      let updatedImages = [...images];
      const temp = updatedImages[index];
      updatedImages = updatedImages.filter((_, i) => i !== index);
      updatedImages.unshift(temp);
      setImages(updatedImages);
    }
  }

  function scrollToTop() {
    inputRef.current.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <main className=" flex flex-col flex-grow items-center w-full h-4/5 overflow-y-auto bg-teal-100 py-3">
      <div className="h-2/5 my-2">
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg, image/png"
          onChange={handleImageUpload}
          className="text-sm text-center
          file:mr-5 file:py-1 file:px-3 file:border-1
          file:text-md file:font-medium
          file:bg-stone-50 file:text-stone-700
          file:rounded hover:file:shadow-md hover:file:shadow-black
          hover:file:cursor-pointer hover:file:bg-blue-50
          my-3"
          multiple
        />
        <QualitySelector quality={quality} setQuality={setQuality} />
      </div>
      <div className="flex flex-col flex-grow md:flex-row justify-center items-center md:flex-wrap relative gap-2 p-2">
        {images.map((image, index) => (
          <div
            className="flex flex-col items-center p-3 border-4 rounded-xl xl:h-[600px] xl:w-[500px] w-4/5 aspect-square"
            key={index}
          >
            <div className="flex gap-2 items-center justify-center">
              <p className=" text-center text-2xl bg-green-400 border-2 aspect-square w-10 select-none rounded-lg">
                {index + 1}
              </p>
              <div className="flex flex-row items-center my-2">
                <PictureActionButton icon="keyboard_double_arrow_up" action={() => moveImageToTheStart(index)} />
                <PictureActionButton icon="keyboard_arrow_up" action={() => moveImageForward(index)} />
                <PictureActionButton icon="keyboard_arrow_down" action={() => moveImageBackward(index)} />
                <PictureActionButton icon="keyboard_double_arrow_down" action={() => moveImageToTheEnd(index)} />
                <PictureActionButton icon="delete" action={() => handleImageDelete(index)} />
              </div>
            </div>
            <img src={image.url} alt={image.name} className=" object-contain h-[90%] p-2" />
          </div>
        ))}
      </div>
      {images.length > 0 && (
        <div className="flex flex-col gap-2 fixed right-[20px] bottom-[60px] sm:right-[40px] w-[100px] sm:w-[200px]">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={scrollToTop}
          >
            Scroll to Top
          </button>
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => setImages([])}
          >
            Clear
          </button>
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            onClick={downloadPDF}
          >
            Create PDF
          </button>
        </div>
      )}
      {loading && <Loader />}
    </main>
  );
}

export default PdfMage;
