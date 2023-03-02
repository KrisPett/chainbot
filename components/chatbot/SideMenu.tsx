import React, {useState} from "react";
import {models} from "@/components/utils/AIModels";

interface Props {
  setModelSelected: (model: string) => void;
}

const SideMenu = ({setModelSelected}: Props) => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <div className="fixed inset-y-0 left-0 h-full w-64 bg-zinc-300 dark:bg-zinc-600 xxs:hidden sm:block">
      <section className={"mt-24"}>
        <div className={"flex flex-row items-center justify-center"}>
          <span className=" mr-2 text-xl text-gray-800 dark:text-gray-200">Powered By Yoda</span>
          <label className="relative cursor-pointer">
            <input type="checkbox" value="" className="sr-only peer" checked={isChecked}
                   onChange={() => setIsChecked(!isChecked)}/>
            <div
              className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-0 peer-focus:ring-orange-300
              dark:peer-focus:ring-orange-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-['']
              after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full
              after:h-5 after:w-5 after:transition-all dark:border-gray-600
              peer-checked:bg-gradient-to-t peer-checked:from-orange-400 peer-checked:to-amber-400
              dark:peer-checked:bg-gradient-to-t dark:peer-checked:from-orange-600 dark:peer-checked:to-amber-900"
            ></div>
          </label>
        </div>
      </section>
      <section className={"mt-10"}>
        <select className="select select-primary w-full max-w-xs bg-gray-700"
                onChange={(e) => setModelSelected(e.target.value)}>
          {models.map(item => {
            return <option key={item.value} value={item.value}>{item.name}</option>
          })}
        </select>
      </section>
    </div>
  );
};

export default SideMenu;
