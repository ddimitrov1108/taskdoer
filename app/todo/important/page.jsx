import { PageHeader } from "@/components";
import { TasksList } from "@/components/tasks";
import { getImportantTasks } from "@/db";

export const revalidate = 30;

const ImportantPage = async () => {
  const tasks = await getImportantTasks();

  return (
    <>
      <div className="mb-8 grid gap-4 md:flex md:items-end md:justify-between">
        <PageHeader
          type="daily"
          title={
            <>
              <div className="flex gap-3 items-center">Important Tasks</div>
            </>
          }
        />
      </div>

      <TasksList tasks={tasks} />
    </>
  );
};
export default ImportantPage;
