import { LabelInteractiveButtons, PageHeader } from "@/components";
import { TasksList } from "@/components/tasks";
import { getLabelById } from "@/db/getLabelById";
import { redirect } from "next/navigation";

export const revalidate = 30

const page = async ({ params }) => {
  const label = await getLabelById(params.id);

  if (!label) return redirect("/todo");

  return (
    <>
      <div className="mb-10 grid gap-4 md:flex md:items-end md:justify-between">
        <PageHeader
          type="label"
          title={
            <>
              <div className="flex gap-3 items-center">
                <div className="font-medium text-primary-main">@</div>
                {label.name}
              </div>
            </>
          }
        />

        <LabelInteractiveButtons label={{ name: label.name }} />
      </div>

      <TasksList tasks={label.tasks} />
    </>
  );
};
export default page;
