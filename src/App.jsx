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
    <>
      <div className="flex flex-col h-full w-full">
        <header className=" bg-gradient-to-b from-[#778599] to-[#699de7]  w-full h-[15%]">
          <div className="flex items-center justify-center h-full">
            <img src="/logo.png" className="rounded-3xl object-contain h-1/2 hidden xl:inline" />
            <img src="/title.svg" alt="title" className="h-4/6 object-contain" />
          </div>
        </header>
        <PdfMage />
        <footer className="bg-gradient-to-t from-[#699de7] to-[#778599]  h-[40px] flex items-center justify-end px-3 text-stone-200">
          <button onClick={openDialog} className="mx-5">
            About
          </button>
          <p>PDF Mage | 2024</p>
        </footer>
      </div>
      <dialog ref={dialogRef}>
        <div className="h-4/5 w-full p-3 flex flex-col items-center justify-between bg-gradient-to-b bg-[#699de7]">
          <img src="/title.svg" alt="title" className="h-1/5" />
          <div className="font-semibold flex-grow sm:text-2xl px-12">
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
            <div className="flex flex-col items-start border-2 m-2 p-2 border-stone-800 rounded-lg">
              <p className="font-extrabold pr-4">IMPORTANT</p>
              <p>The application does not store the uploaded images in any way, the images never leave your browser.</p>
            </div>
          </div>
          <button className="bg-red-500 p-2 px-4 rounded-lg text-stone-200" onClick={closeDialog}>
            Close
          </button>
        </div>
      </dialog>
    </>
  );
}

export default App;
