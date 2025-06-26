import { FiBookmark, FiSettings, FiClock } from "react-icons/fi";
import { checkPathMatch } from "@/utils/misc.ts";

const SidebarNav = () => {
  const NAV_ITEM = [
    {
      title: "Dashboard",
      icon: <FiClock className={"text-white text-xl"} />,
      path: "/",
    },
    {
      title: "Dashboard",
      icon: <FiBookmark className={"text-white text-xl"} />,
      path: "/dashboard",
    },
    {
      title: "Dashboard",
      icon: <FiSettings className={"text-white text-xl"} />,
      path: "/dashboard",
    },
  ];

  return (
    <div className={"h-[100vh] flex flex-col gap-4 "}>
      {NAV_ITEM.map(({ title, icon, path }, index: number) => {
        const is_active = checkPathMatch(path);
        return (
          <div
            key={index}
            className={`w-[40px] h-[40px] justify-center cursor-pointer 
               flex items-center rounded-md ${is_active ? "bg-card" : ""}`}
          >
            {icon}
          </div>
        );
      })}
    </div>
  );
};

export default SidebarNav;
