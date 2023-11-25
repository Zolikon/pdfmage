import { useRef, useState } from "react";
import pdfMake from "pdfmake/build/pdfmake";

function Main() {
  const [images, setImages] = useState([]);
  const inputRef = useRef(null);

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files).map((file) => {
      return { url: URL.createObjectURL(file), name: file.name };
    });
    setImages((current) => [...current, ...files]);
    inputRef.current.value = null;
  };

  async function generatePDF() {
    const docDefinition = {
      content: [],
    };

    for (const image of images) {
      const response = await fetch(image.url);
      const blob = await response.blob();
      const reader = new FileReader();
      reader.onloadend = function () {
        const base64data = reader.result;

        if (docDefinition.content.length !== 0) {
          docDefinition.content.push({ text: "", pageBreak: "after" });
        }

        docDefinition.content.push({
          image: base64data,
          width: 570,
          height: 821,
          absolutePosition: { x: 10, y: 10 },
        });

        if (images.length === 1 || docDefinition.content.length === images.length * 2 - 1) {
          pdfMake.createPdf(docDefinition).download(`magic_by_pdf_mage_${getCurrentTime()}.pdf`);
        }
        console.log(docDefinition.content.length);
      };

      reader.readAsDataURL(blob);
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

  function getCurrentTime() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");

    return `${year}_${month}_${day}_${hours}_${minutes}_${seconds}`;
  }

  return (
    <main className="flex flex-col items-center w-full">
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg, image/png"
        onChange={handleImageUpload}
        className="border border-gray-300 rounded-md p-2 mt-2 mb-3"
        multiple
      />
      {images.length > 0 && (
        <p className=" text-center p-1 bg-yellow-200 rounded mb-2 select-none shadow-sm shadow-black">
          ⚠ Mobile pictures are rotated based on orientation in final pdf ⚠
        </p>
      )}
      <div className="flex flex-col md:flex-row h-11 md:justify-center md:items-center md:flex-wrap relative w-[80%] gap-2">
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
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded fixed bottom-3 right-3"
          onClick={generatePDF}
        >
          Create PDF
        </button>
      )}
    </main>
  );
}

export default Main;
