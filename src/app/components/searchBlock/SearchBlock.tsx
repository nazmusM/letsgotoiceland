"use client";

import { useEffect, useState } from "react";
import { PrismicDocument } from "@/lib/enums";
import Selector from "./Selector";
import QUERIES from "@/lib/queries";

interface SearchBlockProps {
  setQuery: React.Dispatch<
    React.SetStateAction<Record<string, string | undefined>>
  >;
  query: Record<string, string | undefined>;
}

const DefaultValues: Record<string, string> = {
  season: "All Seasons",
  type: "All Types",
};

const SearchBlock: React.FC<SearchBlockProps> = ({ query, setQuery }) => {
  const [seasonChoices, setSeasonChoices] = useState<string[]>([]);
  const [typeChoices, setTypeChoices] = useState<string[]>([]);
  const handleSelectChange = (type: string, slug: string) => {
    setQuery({
      type,
      slug: (slug !== DefaultValues[type] && slug) || undefined,
    });
  };

  useEffect(() => {
    const fetchChoices = async () => {
      const seasons = await QUERIES.common.getSiblingNamesByType(
        PrismicDocument.SEASON,
      );
      const types = await QUERIES.common.getSiblingNamesByType(
        PrismicDocument.TYPE,
      );
      setSeasonChoices(seasons);
      setTypeChoices(types);
    };
    fetchChoices();
  }, []);

  const selectedChoice = (type: string): string => {
    if (type === query.type) {
      return query.slug || DefaultValues[type];
    }
    return DefaultValues[type];
  };
  return (
    <div className="md:mx-auto md:max-w-[1200px]">
      <div className="flex w-full flex-1 justify-center gap-2">
        <Selector
          field="season"
          selected={selectedChoice("season")}
          choices={[DefaultValues["season"], ...seasonChoices]}
          onChange={handleSelectChange}
        />
        <Selector
          field="type"
          selected={selectedChoice("type")}
          choices={[DefaultValues["type"], ...typeChoices]}
          onChange={handleSelectChange}
        />
      </div>
    </div>
  );
};

export default SearchBlock;
