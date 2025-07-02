import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ReactNode } from "react";

interface IDropDown {
  children?: ReactNode;
  trigger: JSX.Element;
}
const CustomDropDown = ({ children, trigger }: IDropDown) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
      <DropdownMenuContent className={"bg-card border-0 text-white/80"}>
        {children}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CustomDropDown;
