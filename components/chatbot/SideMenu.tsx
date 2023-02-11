import React from "react";

interface IListType {
  id: string;
  title: string;
}

const SideMenu = () => {
  let counter = 1;
  let items = [];
  for (let i = 0; i < 30; i++) {
    items.push({ id: counter, title: "Old Chat Bot: " + counter + "" });
    counter++;
  }

  return (
    <div className="fixed inset-y-0 left-0 h-full w-64 bg-zinc-300 dark:bg-zinc-600 xxs:hidden sm:block">
      <section className={"mt-20"}>
        <div className={""}>
          <ul className="menu bg-zinc-300 dark:bg-zinc-600">
            <li className={"p-2"}>
              <a
                className={
                  "rounded-md bg-zinc-400 active:bg-zinc-400 dark:bg-zinc-700 hover:dark:bg-zinc-500 active:dark:bg-zinc-400"
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
                New Chat
              </a>
            </li>
          </ul>
        </div>
        <ul className="menu bg-zinc-300 dark:bg-zinc-600">
          {items.map((item) => (
            <li key={item.id} className={"p-2"}>
              <a
                className={
                  "rounded-md bg-zinc-300 hover:bg-zinc-400 active:bg-zinc-400 dark:bg-zinc-600 hover:dark:bg-zinc-500 active:dark:bg-zinc-400"
                }
              >
                {item.title}
              </a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default SideMenu;
