import { FiBookmark, FiSettings, FiClock } from "react-icons/fi";

const SidebarNav = () => {
  const NAV_ITEM = [
    {
      title: "Dashboard",
      icon: <FiClock className={"text-white text-xl"} />,
      path: "/dashboard",
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
        return (
          <div
            key={index}
            className={
              "w-[40px] h-[40px] flex items-center justify-center cursor-pointer" +
              " bg-card flex items-center rounded-md"
            }
          >
            {icon}
          </div>
        );
      })}
    </div>
  );
};

export default SidebarNav;
