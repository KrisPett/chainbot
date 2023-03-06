import React from "react";

interface IButton {
  title: string;
  onClick: () => void;
}

const ButtonAlt = ({ title, onClick }: IButton) => {
  return (
    <button
      draggable
      onClick={onClick}
      onDragEnd={onClick}
      className="group btn relative text-sm
      text-gray-800 hover:text-gray-700 group-hover:to-orange-400
      bg-gradient-to-b from-gray-200 to-gray-300 text-gray-900 dark:bg-orange-1100 dark:from-orange-600 dark:to-amber-900 dark:text-gray-300
      dark:hover:text-white dark:group-hover:to-orange-400 xxs:w-full xs:w-full normal-case"
    >
      <span className="">
        {title}
      </span>
    </button>
  );
};

export default ButtonAlt;
