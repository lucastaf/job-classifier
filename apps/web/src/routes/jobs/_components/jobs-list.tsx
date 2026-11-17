import { useJobsControllerListJobs } from "@/api/generated";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useNavigate } from "@tanstack/react-router";
import { format } from "date-fns";
import {
  columnFilteringFeature,
  createFilteredRowModel,
  filterFn_includesString,
  globalFilteringFeature,
  tableFeatures,
  useTable,
  type ColumnDef,
} from "@tanstack/react-table";
import type { JobsListItemDTO } from "@/api/generated/models";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";

const features = tableFeatures({
  columnFilteringFeature: columnFilteringFeature,
  globalFilteringFeature: globalFilteringFeature,
  filteredRowModel: createFilteredRowModel(),
  filterFns: {
    includesString: filterFn_includesString,
  },
});

const columns: Array<ColumnDef<typeof features, JobsListItemDTO>> = [
  {
    accessorKey: "title",
    header: "Job Title",
  },
  {
    accessorKey: "companyName",
    header: "Company Name",
  },
  {
    accessorKey: "kanbanStatus",
    header: "Status",
    accessorFn: (job) => job.kanbanStatus.columnName,
  },
  {
    accessorKey: "applicationDate",
    header: "Applied At",
    accessorFn: (job) => format(job.applicationDate, "dd/MM/yyyy HH:mm"),
  },
];

export function JobsList() {
  const JobsList = useJobsControllerListJobs();
  const isLoading = JobsList.isLoading;
  const data = JobsList.data?.data!;
  const navigate = useNavigate();

  const [globalFilter, setGlobalFilter] = useState("");

  const table = useTable({
    columns,
    data,
    features,
    state: {
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,

    globalFilterFn: "includesString",
  });

  return (
    <div>
      <div className="relative w-full max-w-sm">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          size={18}
        />

        <Input
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
          placeholder="Search..."
          className="pl-10"
        />
      </div>
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
          {isLoading ? (
            <>
              <TableCell colSpan={4} className="font-medium">
                <Skeleton className="w-full h-75" />
              </TableCell>
            </>
          ) : (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                onClick={() => {
                  navigate({
                    to: `/jobs/${row.original.id}`,
                  });
                }}
                className="cursor-pointer"
              >
                <TableCell className="font-medium">
                  {row.original.title}
                </TableCell>
                <TableCell>{row.original.companyName}</TableCell>
                <TableCell>{row.original.kanbanStatus.columnName}</TableCell>
                <TableCell className="text-right">
                  {format(row.original.applicationDate, "dd/MM/yyyy HH:mm")}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
