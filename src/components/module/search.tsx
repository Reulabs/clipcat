import { useState } from "react";
import { Button, Input } from "../ui";
import {
  FiFilter,
  FiSearch,
  FiTag,
  FiArrowDown,
  FiArrowUp,
} from "react-icons/fi";
import CustomDropDown from "@/components/module/drop-down-module.tsx";

const FILTERBUTTON = (
  <Button className="bg-transparent border border-white/10 text-white/80 flex items-center gap-2 px-3 py-2 rounded-md hover:bg-white/5 transition">
    <FiFilter size={16} />
    <span className="hidden lg:block text-sm">Filter</span>
  </Button>
);

const DROPDOWN_ITEMS = [
  { label: "Filter by Type", icon: FiTag, value: "type" },
  { label: "Sort A–Z", icon: FiArrowUp, value: "asc" },
  { label: "Sort Z–A", icon: FiArrowDown, value: "desc" },
];

const SearchedItem = ({
  label,
  onRemove,
}: {
  label: string;
  onRemove: () => void;
}) => (
  <div className="bg-card flex items-center gap-2 w-fit py-1 px-3 text-white/90 rounded-full text-sm cursor-pointer hover:bg-muted/10 transition">
    <span>{label}</span>
    <button
      onClick={onRemove}
      className="text-white/60 cursor-pointer focus:outline-none"
    >
      &times;
    </button>
  </div>
);

const SearchModule = () => {
  const [searchInput, setSearchInput] = useState("");
  const [keywords, setKeywords] = useState<string[]>([]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchInput.trim()) {
      if (!keywords.includes(searchInput.trim())) {
        setKeywords((prev) => [...prev, searchInput.trim()]);
      }
      setSearchInput("");
    }
  };

  const removeKeyword = (keyword: string) => {
    setKeywords((prev) => prev.filter((k) => k !== keyword));
  };

  const clearKeywords = () => setKeywords([]);

  return (
    <div className="w-full">
      <div className="flex items-center gap-2">
        <div className="w-full bg-card rounded-md flex items-center px-3 ">
          <FiSearch size={18} className="text-white/70 mr-2" />
          <Input
            placeholder="Search..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full bg-transparent outline-none border-none text-white/90 placeholder-white/40 focus:outline-none focus:ring-0 focus:border-0"
          />
        </div>

        <CustomDropDown trigger={FILTERBUTTON}>
          <div className="flex flex-col text-white text-sm">
            {DROPDOWN_ITEMS.map(({ label, icon: Icon, value }) => (
              <div
                key={value}
                className="flex items-center gap-2 px-4 py-2 hover:bg-muted/10 cursor-pointer transition"
                onClick={() => setKeywords((prev) => [...prev, label])}
              >
                <Icon size={16} />
                <span>{label}</span>
              </div>
            ))}
          </div>
        </CustomDropDown>
      </div>

      {keywords.length > 0 && (
        <div className="flex items-center  flex-wrap mt-3">
          <div className="flex gap-2 flex-wrap">
            {keywords.map((word, index) => (
              <SearchedItem
                key={index}
                label={word}
                onRemove={() => removeKeyword(word)}
              />
            ))}
          </div>

          <button
            onClick={clearKeywords}
            className="text-xs gap-2 cursor-pointer text-white/90 border-l border-white/8 pl-2 hover:text-white transition ml-2"
          >
            <span className={"text-sm mr-1"}>&times;</span>
            Clear all
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchModule;
