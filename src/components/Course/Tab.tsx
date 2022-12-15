"use client";
import clsx from "clsx";
import { useCallback, useState } from "react";
import ContentTab from "./ContentTab";
import IssueTab from "./IssueTab";

const Tab = () => {
  const [activeTab, setActiveTab] = useState(0);

  const onActiveTab = useCallback((index: number) => {
    setActiveTab(index);
  }, []);

  return (
    <div>
      <div className="mb-10 flex flex-row gap-10">
        <div
          className={clsx(
            "flex flex-row items-center pb-2 gap-4 px-2",
            activeTab === 0 && "border-b-blue-400  border-b-2"
          )}
          onClick={() => onActiveTab(0)}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 29 29"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19.563 14.4992H14.5006M14.5006 14.4992H9.43805M14.5006 14.4992V19.5616M14.5006 14.4992L14.5006 9.4367M28 6.06247L28 22.9375C28 25.7335 25.7334 28 22.9375 28H6.0625C3.26656 28 1 25.7335 1 22.9375V6.06247C1 3.26655 3.26656 1 6.0625 1H22.9375C25.7334 1 28 3.26655 28 6.06247Z"
              stroke={activeTab === 0 ? "black" : "#979494"}
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          <span
            className={clsx(
              "font-bold text-lg",
              activeTab === 0 ? "text-black" : "text-[#979494]"
            )}
          >
            Content
          </span>
        </div>

        <div
          className={clsx(
            "flex flex-row items-center pb-2 gap-4 px-2",
            activeTab === 1 && "border-b-blue-400  border-b-2 "
          )}
          onClick={() => onActiveTab(1)}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 26 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.2001 14.7136L12.0501 17.5636L17.7501 11.8636M1.6001 6.16359L10.451 1.73815C12.0557 0.935795 13.9445 0.935794 15.5492 1.73815L24.4001 6.16359C24.4001 6.16359 24.4001 14.4856 24.4001 18.8746C24.4001 23.2636 20.343 26.2263 13.0001 30.8636C5.65723 26.2263 1.6001 22.3136 1.6001 18.8746V6.16359Z"
              stroke={activeTab === 1 ? "black" : "#979494"}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span
            className={clsx(
              "font-bold text-lg",
              activeTab === 1 ? "text-black" : "text-[#979494]"
            )}
          >
            Issue Certificate
          </span>
        </div>
      </div>
      {activeTab === 0 ? <ContentTab /> : <IssueTab />}
    </div>
  );
};

export default Tab;
