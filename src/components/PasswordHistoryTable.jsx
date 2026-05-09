import { MoreHorizontalIcon } from "lucide-react";
import { formatRelativeTime } from "@/utils/formatRelativeTime";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function PasswordHistoryTable({ history, onDelete }) {
  console.log("---history---", history);

  if (!history.length) {
    return (
      <div className="text-center font-bold text-brand-warning">
        No passwords generated on this device yet
      </div>
    );
  }

  return (
    <Table>
      <TableHeader className="text-white">
        <TableRow className="text-white">
          <TableHead className="text-white">Strength</TableHead>
          <TableHead className="text-white">Password</TableHead>
          <TableHead className="text-white">Generated</TableHead>
          <TableHead className="text-right text-white">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {history.map((item) => {
          const strengthColors = {
            strong: "text-brand-success",
            medium: "text-brand-warning",
            weak: "text-brand-orange",
            "very weak": "text-brand-error",
          };
          return (
            <TableRow key={item.createdAt}>
              <TableCell
                className={`font-medium uppercase text-[10px] whitespace-nowrap ${strengthColors[item.strength]}`}
              >
                {item.strength}
              </TableCell>
              <TableCell className="break-all">{item.password}</TableCell>
              <TableCell>
                {" "}
                <div className="flex flex-col">
                  <span>{formatRelativeTime(item.createdAt)}</span>

                  <span className="text-xs text-grey-200/80">
                    {new Date(item.createdAt).toLocaleString([], {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </span>
                </div>
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger
                    render={
                      <Button variant="ghost" size="icon" className="size-8">
                        <MoreHorizontalIcon />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    }
                  />
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem className="cursor-pointer">
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="cursor-pointer"
                      onClick={() =>
                        navigator.clipboard.writeText(item.password)
                      }
                    >
                      Copy
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      variant="destructive"
                      className="cursor-pointer"
                      onClick={() => onDelete(item)}
                    >
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
//   async function setClipboard(text) {
//     dispatch({ type: "copy" });
//     setTimeout(() => {
//       dispatch({ type: "resetCopy" });
//     }, 2000);
//     await navigator.clipboard.writeText(text);
//   }
