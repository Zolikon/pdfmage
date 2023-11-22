import Main from "./main";

function App() {
  document.title = "PDF Mage";

  return (
    <div>
      <header className=" bg-slate-400">
        <img src="/title.svg" alt="title" className="w-1/2 mx-auto" />
      </header>
      <Main />
      <footer></footer>
    </div>
  );
}

export default App;
