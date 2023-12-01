import { PageHeader } from "@/components";
import { TasksList } from "@/components/tasks";
import { nextAuthConfig } from "@/lib/next-auth-config";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";

export const revalidate = 30;

const page = async () => {
  const today = new Date();
  const startOfToday = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );
  const endOfToday = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() + 1
  );
  
  const session = await getServerSession(nextAuthConfig);

  const tasks = await prisma.tasks.findMany({
    where: {
      dueDate: {
        gte: startOfToday,
        lt: endOfToday,
      },
      project: {
        uid: session.user.id,
      },
    },
    include: {
      labels: true,
    }
  });

  return (
    <>
      <div className="mb-10 grid gap-4 md:flex md:items-end md:justify-between">
        <PageHeader
          type="daily"
          title={
            <>
              <div className="flex gap-3 items-center">My Day</div>
            </>
          }
        />
      </div>

      <TasksList tasks={tasks} />
    </>
  );
};
export default page;
