import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";

export function QualitySelector({ quality, setQuality }) {
  const [isOpen, setIsOpen] = useState(false);
  const buttonContainerRef = useRef(null);

  useEffect(() => {
    if (buttonContainerRef.current) {
      buttonContainerRef.current.animate([{ opacity: 0 }, { opacity: 0 }, { opacity: 1 }], {
        duration: 300,
        easing: "ease-in",
      });
    }
  }, [isOpen]);

  return (
    <div
      className={`flex flex-col items-center border-1 rounded-md m-2 p-2 bg-[#699de7] w-full transition-all duration-300 cursor-pointer ${
        isOpen ? "h-[100px]" : "h-[50px]"
      }`}
    >
      <div
        className="text-center font-extrabold text-xl select-none w-full flex items-center justify-center"
        onClick={() => setIsOpen((t) => !t)}
      >
        <p className="flex-grow pl-3">Output quality</p>
        <span className="material-symbols-outlined">{isOpen ? "expand_less" : "expand_more"}</span>
      </div>
      {isOpen && (
        <div className="flex gap-2 justify-evenly m-2" ref={buttonContainerRef}>
          <QualityLabel name="LOW" currentSelected={quality} setQuality={setQuality} />
          <QualityLabel name="NORMAL" currentSelected={quality} setQuality={setQuality} />
          <QualityLabel name="ORIGINAL" currentSelected={quality} setQuality={setQuality} />
        </div>
      )}
    </div>
  );
}

QualitySelector.propTypes = {
  quality: PropTypes.string.isRequired,
  setQuality: PropTypes.func.isRequired,
};

export function QualityLabel({ name, currentSelected, setQuality }) {
  return (
    <p
      className={`${
        currentSelected === name
          ? " bg-green-600 text-stone-200 border-double"
          : " bg-slate-400 text-slate-900 hover:bg-slate-500 hover:border-double "
      } rounded-md border-2 border-stone-950  w-1/2 p-2 text-sm  text-center hover:cursor-pointer select-none`}
      onClick={() => setQuality(name)}
    >
      {name}
    </p>
  );
}

QualityLabel.propTypes = {
  name: PropTypes.string.isRequired,
  currentSelected: PropTypes.string.isRequired,
  setQuality: PropTypes.func.isRequired,
};
