import React, {useState} from "react";
import {models} from "@/components/utils/AIModels";

interface Props {
  setModelSelected: (model: string) => void;
  setIsCheckedYodaMode: (isChecked: boolean) => void;
  setTemperatureRange: (range: number) => void;
  temperatureRange: number
  isCheckedYodaMode: boolean;
}

const SideMenuChatBot = ({
                    setModelSelected,
                    setIsCheckedYodaMode,
                    isCheckedYodaMode,
                    setTemperatureRange,
                    temperatureRange
                  }: Props) => {
  return (
    <div
      className="fixed inset-y-0 left-0 h-full w-64 bg-zinc-300 dark:bg-gradient-to-b from-zinc-600 to-zinc-500 xxs:hidden sm:block">
      <section className={"mt-24"}>
        <div className={"flex flex-row items-center justify-center"}>
          <span className=" mr-2 text-xl text-zinc-800 dark:text-zinc-200">Powered By Yoda</span>
          <label className="relative cursor-pointer">
            <input type="checkbox" value="" className="sr-only peer" checked={isCheckedYodaMode}
                   onChange={() => setIsCheckedYodaMode(!isCheckedYodaMode)}/>
            <div
              className="w-11 h-6 bg-zinc-200 rounded-full peer peer-focus:ring-0 peer-focus:ring-orange-300
              dark:peer-focus:ring-orange-800 dark:bg-zinc-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-['']
              after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full
              after:h-5 after:w-5 after:transition-all dark:border-zinc-600
              peer-checked:bg-gradient-to-t peer-checked:from-orange-400 peer-checked:to-amber-400
              dark:peer-checked:bg-gradient-to-t dark:peer-checked:from-orange-600 dark:peer-checked:to-amber-900"
            ></div>
          </label>
        </div>
      </section>
      <section className={"mt-10 flex justify-center"}>
        <select
          className="select select-lg max-w-xs focus:border-orange-1200 bg-gray-200 w-11/12 font-medium text-gray-800 dark:text-gray-200
              placeholder-opacity-50
                  focus:outline-none focus:ring-0 focus:ring-offset-0 focus:ring-offset-orange-300
                  focus-visible:border-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:ring-offset-orange-300
                  dark:bg-zinc-700 dark:placeholder-neutral-100 dark:focus-visible:ring-offset-orange-600 dark:disabled:opacity-30
          "
          onChange={(e) => setModelSelected(e.target.value)}>
          {models.map(item => {
            return <option key={item.value} value={item.value}>{item.name}</option>
          })}
        </select>
      </section>
      <section className={"mt-5 flex justify-center"}>
        <div className={"w-11/12 "}>
          <label htmlFor="customRange3" className="inline-block text-zinc-800 dark:text-zinc-200">
            Temperature: {temperatureRange / 50}
          </label>
          <input
            type="range"
            className="transparent h-1.5 w-full cursor-pointer appearance-none rounded-lg border-transparent bg-zinc-100 dark:bg-zinc-500
            "
            id="customRange3" value={temperatureRange} onChange={e => setTemperatureRange(parseInt(e.target.value))}
            min="0"
            max="100"
          />
        </div>
      </section>
    </div>
  );
};

export default SideMenuChatBot;
