import {
  FiBookmark,
  FiSettings,
  FiClock,
  FiChevronRight,
} from "react-icons/fi";
import { checkPathMatch } from "@/utils/misc.ts";
import Avatar from "boring-avatars";

const SidebarNav = () => {
  const NAV_ITEM = [
    {
      title: "Overview",
      icon: <FiClock className="text-white text-xl" />,
      path: "/",
    },
    {
      title: "Bookmarks",
      icon: <FiBookmark className="text-white text-xl" />,
      path: "/dashboard/bookmarks",
    },
    {
      title: "Settings",
      icon: <FiSettings className="text-white text-xl" />,
      path: "/dashboard/settings",
    },
  ];

  return (
    <aside className="h-screen  bg-[#1D1D1D] flex flex-col items-center justify-between py-4 shrink-0">
      <div className="flex flex-col justify-center items-center gap-4 ">
        <Avatar variant={"pixel"} />
        <div
          className={
            "w-[34px] border-1 cursor-pointer border-white/8 flex items-center justify-center h-[34px] rounded-md"
          }
        >
          <FiChevronRight size={20} color={"white"} />
        </div>

        <div className={"flex flex-col gap-3 items-center justify-center"}>
          {NAV_ITEM.map(({ title, icon, path }, index) => {
            const is_active = checkPathMatch(path);
            const item_is_first = index === 0;
            return (
              <div key={index} className={""}>
                <div
                  className={`w-10 h-10  flex items-center justify-center rounded-md
                           cursor-pointer transition-colors ${
                             is_active ? "bg-card" : "hover:bg-muted/5"
                           } ${item_is_first ? "mt-2" : ""}`}
                >
                  {icon}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div>
        <Avatar size={36} name="Emmanuel Obiabo" />
      </div>
    </aside>
  );
};

export default SidebarNav;
