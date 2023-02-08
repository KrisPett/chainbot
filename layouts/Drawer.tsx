import React from 'react';

interface IListType {
  id: string,
  title: string,
}

const Drawer = () => {
  const tmp: IListType[] = [
    {id: '1', title: 'Old Chat Bot'},
    {id: '1', title: 'Old Chat Bot'},
    {id: '1', title: 'Old Chat Bot'},
    {id: '1', title: 'Old Chat Bot'},
    {id: '1', title: 'Old Chat Bot'},
    {id: '1', title: 'Old Chat Bot'},
    {id: '1', title: 'Old Chat Bot'},
    {id: '1', title: 'Old Chat Bot'},
    {id: '1', title: 'Old Chat Bot'},
    {id: '1', title: 'Old Chat Bot'},
    {id: '1', title: 'Old Chat Bot'},
    {id: '1', title: 'Old Chat Bot'},
    {id: '1', title: 'Old Chat Bot'},
    {id: '1', title: 'Old Chat Bot'},
    {id: '1', title: 'Old Chat Bot'},
    {id: '1', title: 'Old Chat Bot'},
    {id: '1', title: 'Old Chat Bot'},
    {id: '1', title: 'Old Chat Bot'},
    {id: '1', title: 'Old Chat Bot'},
    {id: '1', title: 'Old Chat Bot'},
    {id: '1', title: 'Old Chat Bot'},
    {id: '1', title: 'Old Chat Bot'},
    {id: '1', title: 'Old Chat Bot'},
    {id: '1', title: 'Old Chat Bot'},
    {id: '1', title: 'Old Chat Bot'},
    {id: '1', title: 'Old Chat Bot'},
    {id: '1', title: 'Old Chat Bot'},
    {id: '1', title: 'Old Chat Bot'},
    {id: '1', title: 'Old Chat Bot'},
    {id: '1', title: 'Old Chat Bot'},
    {id: '1', title: 'Old Chat Bot'},
    {id: '1', title: 'Old Chat Bot'}
  ]
  return (
    <div className="bg-zinc-300 dark:bg-zinc-600 w-64 h-full fixed inset-y-0 left-0 xxs:hidden sm:block">
      <section className={"mt-20"}>
        <div className={""}>
          <ul className="menu bg-zinc-300 dark:bg-zinc-600">
          <li className={"p-2"}>
                <a className={"bg-zinc-400 dark:bg-zinc-700 rounded-md hover:dark:bg-zinc-500 active:bg-zinc-400 active:dark:bg-zinc-400"}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                       stroke="currentColor" className="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15"/>
                  </svg>
                  New Chat
                </a>
              </li>

          </ul>
        </div>
        <ul className="menu bg-zinc-300 dark:bg-zinc-600">
          {tmp.map(item => <li key={item.id} className={"p-2"}>
              <a className={"bg-zinc-300 dark:bg-zinc-600 rounded-md hover:bg-zinc-400 hover:dark:bg-zinc-500 active:bg-zinc-400 active:dark:bg-zinc-400"}>{item.title}</a>
            </li>
          )}
        </ul>
      </section>
    </div>

  );
};

export default Drawer;
