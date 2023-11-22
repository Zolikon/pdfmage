import ImageUploader from "./ImageUploader";
import { useRef, useState } from "react";
import { jsPDF } from "jspdf";

function Main() {
  const [images, setImages] = useState([]);
  const dialogRef = useRef(null);

  function setNewImage(url, name) {
    setImages((current) => [...current, { url, name }]);
  }

  function generatePDF() {
    const doc = new jsPDF();
    images.forEach((image, index) => {
      if (index !== 0) {
        doc.addPage();
      }
      doc.addImage(image.url, "JPEG", 10, 10, 190, 277);
    });
    doc.save("magic_by_pdf_mage.pdf");
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

  function handleCloseDialog() {
    dialogRef.current.close();
  }

  return (
    <main className="flex flex-col items-center w-full">
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-2"
        onClick={() => dialogRef.current.showModal()}
      >
        Add image
      </button>
      <div className="flex flex-col md:flex-row h-11 md:flex-wrap relative w-[80%] gap-2">
        {images.map((image, index) => (
          <div className="flex flex-col items-center p-3 border-2 rounded-md" key={index}>
            <p className=" text-center text-2xl">{index + 1}</p>
            <img src={image.url} alt={image.name} />
            <div className="flex flex-row items-center">
              <button onClick={() => handleImageDelete(index)}>❌</button>
              <button onClick={() => moveImageForward(index)}>🔽</button>
              <button onClick={() => moveImageBackward(index)}>🔼</button>
            </div>
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
      <dialog ref={dialogRef}>
        <div className="p-3 rounded-md flex flex-col gap-2 items-center justify-center">
          <ImageUploader setNewImage={setNewImage} close={handleCloseDialog} />
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleCloseDialog}
          >
            Cancel
          </button>
        </div>
      </dialog>
    </main>
  );
}

export default Main;
