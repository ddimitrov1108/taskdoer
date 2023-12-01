import { nextAuthConfig } from "@/lib/next-auth-config";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";

const getDailyTasks = async () => {
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

  try {
    const tasks = await prisma.tasks.findMany({
      where: {
        OR: [
          {
            dueDate: {
              lt: startOfToday, // Tasks that are past due
            },
          },
          {
            dueDate: {
              gte: startOfToday,
              lt: endOfToday, // Tasks that are due today
            },
          },
        ],
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

export default getDailyTasks;
