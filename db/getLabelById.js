import { nextAuthConfig } from "@/lib/next-auth-config";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";

const getLabelById = async (id) => {
  if (!id) return null;

  const session = await getServerSession(nextAuthConfig);
  const projectId = parseInt(id);

  try {
    const label = await prisma.labels.findFirst({
      where: {
        id: projectId,
        uid: session.user.id,
      },
      select: {
        id: true,
        name: true,
        tasks: {
          select: {
            task: {
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
            },
          },
        },
      },
    });

    if (!label?.tasks.length) return label;

    return {
      ...label,
      tasks: label.tasks.map(({ task, ...restTask }) => ({
        ...restTask,
        ...task,
        labels: task.labels.map(({ label }) => ({ ...label })),
      })),
    };
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default getLabelById;
