import PropTypes from "prop-types";

function PictureActionButton({ icon, action }) {
  return (
    <button
      className="flex items-center justify-center hover:bg-gray-400 rounded-full p-1 select-none"
      onClick={action}
    >
      <span className="material-symbols-outlined text-2xl sm:text-4xl">{icon}</span>
    </button>
  );
}

PictureActionButton.propTypes = {
  icon: PropTypes.string.isRequired,
  action: PropTypes.func.isRequired,
};

export default PictureActionButton;
