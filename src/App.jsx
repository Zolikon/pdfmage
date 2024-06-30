import { useRef } from "react";
import PdfMage from "./PdfMage";

function App() {
  const dialogRef = useRef(null);

  function openDialog() {
    dialogRef.current.showModal();
  }

  function closeDialog() {
    dialogRef.current.close();
  }

  return (
    <div className="flex flex-col h-full w-full">
      <header className=" bg-gradient-to-b from-red-500 to-yellow-400 h-1/6 flex items-center justify-center">
        <img src="/title.svg" alt="title" className="m-auto" />
      </header>
      <PdfMage />
      <footer className="bg-gradient-to-t from-red-500 to-yellow-400  h-[40px] flex items-center justify-end px-3 text-stone-200">
        <button onClick={openDialog} className="mx-5">
          About
        </button>
        <p>PDF Mage | 2024</p>
      </footer>
      <dialog ref={dialogRef}>
        <div className="h-[80vh] w-[80vw] p-3 flex flex-col items-center justify-between bg-gradient-to-b from-red-500 to-yellow-400">
          <img src="/title.svg" alt="title" className="h-1/5" />
          <div className="font-semibold flex-grow text-2xl px-12">
            <p className="pb-4">
              This is a pdf creator application. You can upload images and create a pdf file with them. The original
              intent was to easily merge together documents from photos created by phone into a PDF so it can be used
              for administration
            </p>
            <p>{"After the files are uploaded, change the order of images, set up quality then click 'Create PDF'"}</p>
            <p>
              Original quality can result in quite big output PDF. On the other hand if we talk about documents low
              quality should be enough.
            </p>
            <p className="flex border-2 m-2 p-2 border-stone-800 rounded-lg">
              <p className="font-extrabold pr-4">IMPORTANT</p>
              <p>
                The application does not store the uploaded images in any way, the images never even leave your browser.
              </p>
            </p>
          </div>
          <button className="bg-red-500 p-2 px-4 rounded-lg text-yellow-400" onClick={closeDialog}>
            Close
          </button>
        </div>
      </dialog>
    </div>
  );
}

export default App;
