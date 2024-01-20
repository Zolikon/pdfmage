import PdfMage from "./PdfMage";

function App() {
  document.title = "PDF Mage";

  return (
    <div>
      <header className=" bg-slate-400 h-40 sticky">
        <img src="/title.svg" alt="title" className="m-auto" />
      </header>
      <PdfMage />
      <footer></footer>
    </div>
  );
}

export default App;
