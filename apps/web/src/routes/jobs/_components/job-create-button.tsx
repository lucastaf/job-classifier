import { jobsControllerCreateJob } from "@/api/generated";
import type { JobCreateInputDTO } from "@/api/generated/models";
import JobEditModal from "@/components/jobs/job-edit-modal";
import { Button } from "@/ui/button";
import { PlusCircle } from "lucide-react";
import { useState } from "react";

export default function JobCreateButton() {
  const [open, setOpen] = useState(false);

  const createJob = (data: JobCreateInputDTO) => {
    jobsControllerCreateJob(data)
    setOpen(false);
  };

  return (
    <>
      <JobEditModal
        initialData={{
          applicationDate: new Date().toISOString(),
        }}
        onSubmit={createJob}
        open={open}
        setOpen={setOpen}
      />
      <Button
        onClick={() => {
          setOpen(true);
        }}
      >
        <PlusCircle /> Create Job
      </Button>
    </>
  );
}
