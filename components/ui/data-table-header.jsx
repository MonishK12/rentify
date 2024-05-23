
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import { cn } from "@/lib/utils";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  ChevronDown,
  ChevronUp,
  ChevronsUpDownIcon,
} from "lucide-react";

const DataTableColumnHeader = ({ column, title, className }) => {
  if (!column.getCanSort()) {
    return <div className={cn(className)}>{title}</div>;
  }

  return (
    <div className={cn("flex items-center space-x-2 w-full", className)}>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div className="flex justify-center gap-x-2 w-full items-center">
            <p>{title}</p>
            {column.getIsSorted() === "desc" ? (
              <ChevronUp size={13} />
            ) : column.getIsSorted() === "asc" ? (
              <ChevronDown size={13} />
            ) : (
              <ChevronsUpDownIcon size={13} />
            )}
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem onClick={() => column.toggleSorting(false)}>
            <ArrowDownIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            Asc
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => column.toggleSorting(true)}>
            <ArrowUpIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            Desc
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default DataTableColumnHeader;
