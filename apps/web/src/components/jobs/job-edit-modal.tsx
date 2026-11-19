import { useKanbanControllerListColumns } from "@/api/generated";
import type {
  JobCreateInputDTO,
  JobItemByIdDTO,
  JobUpdateInputDTO,
} from "@/api/generated/models";
import { Rating } from "@/components/reui/rating";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/ui/button";
import { format } from "date-fns";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { jobSchema } from "./job-create-schema";
import type z from "zod";
import toast from "react-hot-toast";

export default function JobEditModal(props: {
  open: boolean;
  setOpen: (state: boolean) => void;
  initialData: JobUpdateInputDTO;
  onSubmit: (data: z.infer<typeof jobSchema>) => void;
}) {
  const { initialData: data, open, setOpen, onSubmit } = props;

  const { register, setValue, watch, reset, handleSubmit, getValues } = useForm<
    z.infer<typeof jobSchema>
  >({
    resolver: zodResolver(jobSchema),
    defaultValues: {
      title: data.title,
      companyName: data.companyName,
      applicationDate: format(
        data.applicationDate ? new Date(data.applicationDate) : new Date(),
        "yyyy-MM-dd'T'HH:mm",
      ),
      description: data.description ?? "",
      email: data.email,
      phone: data.phone,
      kanbanStatusId: data.kanbanStatusId,
      rating: data.rating ?? 4,
      jobLink: data.jobLink,
    },
  });
  const availableKanbanStatus = useKanbanControllerListColumns();
  const kanbanStatuses = useMemo(() => {
    const data = availableKanbanStatus.data?.data;
    if (data) {
      if (!getValues("kanbanStatusId")) {
        setValue("kanbanStatusId", data[0].id);
      }
      return (
        data.map((status) => ({
          label: status.columnName,
          value: String(status.id),
        })) ?? []
      );
    }
    return [];
  }, [availableKanbanStatus]);

  return (
    <Dialog
      open={open}
      onOpenChange={(state) => {
        setOpen(state);
        if (!state) reset();
      }}
    >
      <DialogContent className={"min-w-150"}>
        <div>
          <Label>Job Title </Label>
          <Input {...register("title")} />
        </div>
        <div>
          <Label>Company Name </Label>
          <Input {...register("companyName")} />
        </div>

        <div>
          <Label>Description </Label>
          <Textarea {...register("description")} />
        </div>
        <div className="flex justify-between gap-4">
          <div className="grow">
            <Label>Email </Label>
            <Input className="flex-1 w-full" {...register("email")} />
          </div>
          <div className="grow">
            <Label>Phone </Label>
            <Input {...register("phone")} />
          </div>
        </div>

        <div>
          Job Link <Input {...register("jobLink")} />
        </div>
        <div>
          <Label>Application Date </Label>
          <Input type="datetime-local" {...register("applicationDate")} />
        </div>
        <div className="flex justify-between">
          <div className="grow">
            <Label>Rating </Label>
            <Rating
              editable={true}
              rating={watch("rating")}
              onRatingChange={(rate) => setValue("rating", rate)}
            />
          </div>
          <div className="grow">
            <Label>Kanban Status</Label>
            <Select
              items={kanbanStatuses}
              value={String(watch("kanbanStatusId"))}
              onValueChange={(value) => {
                setValue("kanbanStatusId", Number(value));
              }}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {kanbanStatuses.map((kanbanStatus) => (
                  <SelectItem
                    key={kanbanStatus.value}
                    value={kanbanStatus.value}
                  >
                    {kanbanStatus.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex justify-end">
          <Button
            variant={"secondary"}
            onClick={() => {
              reset();
              setOpen(false);
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit(
              (formData) => {
                const patchedDate = new Date(formData.applicationDate)
                  .toISOString()
                  .replace(".000Z", "Z");

                onSubmit({
                  ...formData,
                  applicationDate: patchedDate,
                });
              },
              (errors) => {
                const firstError = Object.values(errors)[0];

                toast.error(
                  firstError?.message?.toString() ?? "Formulário inválido",
                );
              },
            )}
          >
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
