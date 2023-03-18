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
      text-gray-800 hover:text-gray-700 group-hover:to-orange-400
      bg-gradient-to-b from-zinc-300 to-zinc-400 text-gray-900 dark:bg-orange-1100 dark:from-orange-600 dark:to-amber-900 dark:text-gray-300
      dark:hover:text-white dark:group-hover:to-orange-400
      xxs:w-full xs:w-full normal-case
      inline-flex w-full justify-center px-3 py-2 text-sm font-semibold shadow-sm sm:ml-3 sm:w-auto
      "
    >
      <span className="">
        {title}
      </span>
    </button>
  );
};

export default ButtonAlt;
