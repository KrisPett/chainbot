import React from "react";

interface IButton {
  title: string;
  onClick: () => void;
}

const Button = ({ title, onClick }: IButton) => {
  return (
    <button
      draggable
      onClick={onClick}
      onDragEnd={onClick}
      className="group btn relative inline-flex items-center justify-center overflow-hidden rounded-lg
      p-0.5 text-sm font-medium
      text-gray-800 hover:text-gray-700 group-hover:to-orange-400
      bg-gradient-to-b from-gray-200 to-gray-300 text-gray-900 dark:bg-orange-1100 dark:from-orange-600 dark:to-amber-900 dark:text-gray-300
      dark:hover:text-white dark:group-hover:to-orange-400 xxs:w-full xs:w-fit normal-case"
    >
      <span className="relative rounded-md px-4 transition-all duration-75 ease-in group-hover:bg-opacity-0 dark:bg-transparent xxs:w-full xs:w-fit">
        {title}
      </span>
    </button>
  );
};

export default Button;
