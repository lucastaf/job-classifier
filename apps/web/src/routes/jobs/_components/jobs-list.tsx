import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function JobsList() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Job Title</TableHead>
          <TableHead>Company Name</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Applied At</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">Fullstack NodeJS Developer</TableCell>
          <TableCell>Tech Company</TableCell>
          <TableCell>In Progress</TableCell>
          <TableCell className="text-right">10/10/2026 10:30</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
