import styles from "./Loader.module.css";

function Loader() {
  return (
    <div className="fixed inset-0 bg-slate-200/20 flex flex-col items-center justify-center h-vh w-vw backdrop-blur-sm">
      <p className=" border-2 border-black bg-slate-100 text-black p-2 mb-2 text-md font-bold select-none">
        Working...
      </p>
      <div className={styles.external_container}>
        <div className={styles.background_container}>
          <div className={styles.e1}> </div>
          <div className={styles.e2}> </div>
          <div className={styles.e3}> </div>
          <div className={styles.e4}> </div>
        </div>
        <div className={styles.loader_container}>
          <div className={styles.loader}> </div>
        </div>
      </div>
    </div>
  );
}

export default Loader;
