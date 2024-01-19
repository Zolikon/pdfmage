import PropTypes from "prop-types";

export function QualitySelector({ quality, setQuality }) {
  return (
    <div className="flex flex-col items-center border-1 rounded-md m-2 bg-red-300 w-full">
      <p className="text-center font-extrabold text-xl select-none">Quality</p>
      <div className="flex gap-2 justify-evenly m-2">
        <QualityLabel name="LOW" currentSelected={quality} setQuality={setQuality} />
        <QualityLabel name="NORMAL" currentSelected={quality} setQuality={setQuality} />
        <QualityLabel name="ORIGINAL" currentSelected={quality} setQuality={setQuality} />
      </div>
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
          ? " bg-green-600 text-white border-double"
          : " bg-slate-400 text-slate-900 hover:bg-slate-600 hover:border-double "
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
