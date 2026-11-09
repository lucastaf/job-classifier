import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/ui/button";
import type { ReactNode } from "react";

export default function SideBarItem(props: {
  title: string;
  link?: string;
  icon: ReactNode;
}) {
  const { link, title, icon } = props;

  return (
    <Tooltip>
      <TooltipTrigger>
        <Button className="mx-auto flex justify-around mt-1">{icon}</Button>
      </TooltipTrigger>
      <TooltipContent>{title}</TooltipContent>
    </Tooltip>
  );
}
