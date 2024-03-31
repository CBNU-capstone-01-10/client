import { useState } from "react";
import { ITabContent } from "../(routes)/MainLayout";

export interface IReturnValue {
  currentItem: ITabContent;
  changeItem: React.Dispatch<React.SetStateAction<number>>;
}

export default function useTabs(
  initialTab: number,
  allTabs: ITabContent[]
): IReturnValue {
  const [currentIdx, setCurrentIdx] = useState(initialTab);

  if (!allTabs || !Array.isArray(allTabs)) {
    throw new Error("Invalid tabs provided to useTabs.");
  }

  return { currentItem: allTabs[currentIdx], changeItem: setCurrentIdx };
}
