import { nextAuthConfig } from "@/lib/next-auth-config";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";

const getImportantTasks = async () => {
  const session = await getServerSession(nextAuthConfig);

  try {
    const tasks = await prisma.tasks.findMany({
      where: {
        important: true,
        uid: session.user.id,
      },
      select: {
        id: true,
        name: true,
        description: true,
        important: true,
        completed: true,
        dueDate: true,
        labels: {
          select: {
            label: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });

    return tasks.map(({ labels, ...restTask }) => ({
      ...restTask,
      labels: labels.map(({ label }) => ({ ...label })),
    }));
  } catch (err) {
    console.log(err);
    return null;
  }
};

export default getImportantTasks;
