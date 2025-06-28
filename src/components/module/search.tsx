import { Button, Input } from "../ui";
import { FiFilter, FiSearch } from "react-icons/fi";

const SearchedItems = () => {
  return (
    <div
      className={
        "bg-card cursor-pointer flex items-center gap-1 w-fit py-1 px-3 text-white/90 rounded-full"
      }
    >
      <p className={"text-sm"}>Lorem</p>

      <span>&times;</span>
    </div>
  );
};

const SearchModule = () => {
  return (
    <div>
      <div className={"flex items-center gap-2"}>
        <div className={"w-full bg-card rounded-md flex items-center  px-3"}>
          <FiSearch size={20} color="#fff" />
          <Input placeholder="Search..." className={"w-full"} />
        </div>

        <Button className={"bg-transparent border-1 border-white/9"}>
          {" "}
          <FiFilter />
          <h3 className={"hidden lg:block "}>Filter</h3>
        </Button>
      </div>

      <div className={" gap-2 mt-2 flex items-center flex-wrap"}>
        {Array(5)
          .fill(0)
          .map((_, index) => (
            <SearchedItems />
          ))}
      </div>
    </div>
  );
};

export default SearchModule;
