import { Rating } from "@/components/reui/rating";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/ui/button";
import { Pencil } from "lucide-react";

export default function SkillsList() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Rating</TableHead>
          <TableHead className="text-right">Created At</TableHead>
          <TableHead className="text-right w-20">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">Javascript</TableCell>
          <TableCell className="font-medium">Programming Language</TableCell>
          <TableCell>
            <Rating rating={5} />
          </TableCell>
          <TableCell className="text-right">10/10/2026 10:30</TableCell>
          <TableCell className="text-right">
            {" "}
            <Button className="cursor-pointer" size="icon-sm">
              <Pencil />
            </Button>{" "}
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
