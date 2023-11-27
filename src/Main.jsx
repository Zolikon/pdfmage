import { useRef, useState } from "react";

import Loader from "./Loader";
import { generatePDF } from "./fileUtils";

function Main() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);

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
      await generatePDF(images);
    } finally {
      setLoading(false);
    }
  }

  function handleImageDelete(index) {
    setImages((current) => current.filter((_, i) => i !== index));
  }

  function moveImageForward(index) {
    if (index < images.length - 1) {
      const updatedImages = [...images];
      const temp = updatedImages[index];
      updatedImages[index] = updatedImages[index + 1];
      updatedImages[index + 1] = temp;
      setImages(updatedImages);
    }
  }

  function moveImageBackward(index) {
    if (index > 0) {
      const updatedImages = [...images];
      const temp = updatedImages[index];
      updatedImages[index] = updatedImages[index - 1];
      updatedImages[index - 1] = temp;
      setImages(updatedImages);
    }
  }

  return (
    <main className="flex flex-col items-center w-full">
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
      <div className="flex flex-col md:flex-row h-11 md:justify-center md:items-center md:flex-wrap relative w-[80%] gap-2 mb-3">
        {images.map((image, index) => (
          <div className="flex flex-col items-center p-3 border-2 rounded-md md:w-[60%]" key={index}>
            <p className=" text-center text-2xl bg-slate-400 border-2 aspect-square w-10 select-none">{index + 1}</p>
            <div className="flex flex-row items-center mb-2">
              <button className=" text-2xl" onClick={() => handleImageDelete(index)}>
                ❌
              </button>
              <button className=" text-2xl" onClick={() => moveImageForward(index)}>
                🔽
              </button>
              <button className=" text-2xl" onClick={() => moveImageBackward(index)}>
                🔼
              </button>
            </div>
            <img src={image.url} alt={image.name} />
          </div>
        ))}
      </div>
      {images.length > 0 && (
        <div className="flex flex-col gap-2 fixed bottom-3 right-3">
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

export default Main;
