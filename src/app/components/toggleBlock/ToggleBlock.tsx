"use client";

import { useEffect, useState } from "react";
import { PrismicDocument } from "@/lib/enums";
import { classNames } from "@/utils";
import QUERIES from "@/lib/queries";

interface ToggleBlockProps {
  setQuery: React.Dispatch<React.SetStateAction<"City" | "Category">>;
  query: "City" | "Category";
  choices: string[];
}

const ToggleBlock: React.FC<ToggleBlockProps> = ({
  choices,
  query,
  setQuery,
}) => {
  return (
    <div className="flex w-full place-items-center justify-center">
      <div className="flex w-[280px] items-center rounded-full bg-gray-200 p-1 gap-x-2">
        <button
          className={`flex-1 rounded-full p-2 text-center font-[600] text-base ${
            query === "City"
              ? "bg-white"
              : "bg-transparent text-[#666666]"
          }`}
          onClick={() => setQuery("City")}
        >
          Cities
        </button>
        <button
          className={`flex-1 rounded-full p-2 text-center font-[600] text-base ${
            query === "Category"
              ? "bg-white"
              : "bg-transparent text-[#666666]"
          }`}
          onClick={() => setQuery("Category")}
        >
          Category
        </button>
      </div>
    </div>
  );
};

export default ToggleBlock;
