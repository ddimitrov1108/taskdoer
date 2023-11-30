import { LabelInteractiveButtons, PageHeader } from "@/components";
import { TasksList } from "@/components/tasks";
import { getLabelById } from "@/db/getLabelById";

const page = async ({ params }) => {
  const label = await getLabelById(params.id);

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
