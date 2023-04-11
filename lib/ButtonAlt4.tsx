import React from "react";

interface IButton {
  title: string;
  onClick: () => void;
}

const ButtonAlt = ({title, onClick}: IButton) => {
  return (
    <button
      draggable
      onClick={onClick}
      onDragEnd={onClick}
      className="group btn relative text-sm
      hover:text-gray-700 group-hover:to-orange-400
      bg-gradient-to-b from-gray-200 to-gray-300 text-gray-900 dark:bg-violet-00 dark:from-transparent dark:to-violet-900 dark:text-violet-200
      border-violet-700
      dark:hover:text-white dark:group-hover:to-orange-400
      xxs:w-full xs:w-full normal-case
      inline-flex w-full justify-center px-3 py-2 font-semibold shadow-sm sm:ml-3 sm:w-auto
      "
    >
      <span className="">
        {title}
      </span>
    </button>
  );
};

export default ButtonAlt;
