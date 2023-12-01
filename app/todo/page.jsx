import { PageHeader } from "@/components";
import { MyDayInteractiveButtons } from "@/components/interactive-buttons";
import { TasksList } from "@/components/tasks";
import { getDailyTasks } from "@/db";

export const revalidate = 30;

const page = async () => {
  const tasks = await getDailyTasks();

  return (
    <>
      <div className="mb-8 grid gap-4 md:flex md:items-end md:justify-between">
        <PageHeader
          type="daily"
          title={
            <>
              <div className="flex gap-3 items-center">My Day</div>
            </>
          }
        />

        <MyDayInteractiveButtons />
      </div>

      <TasksList tasks={tasks} />
    </>
  );
};
export default page;
