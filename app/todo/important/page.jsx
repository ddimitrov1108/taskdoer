import { PageHeader } from "@/components";
import { TasksList } from "@/components/tasks";
import { nextAuthConfig } from "@/lib/next-auth-config";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";

export const revalidate = 30;

const ImportantPage = async () => {
  const session = await getServerSession(nextAuthConfig);

  const tasks = await prisma.tasks.findMany({
    where: {
      important: true,
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
