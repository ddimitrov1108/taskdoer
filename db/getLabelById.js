import { nextAuthConfig } from "@/lib/next-auth-config";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";

export const getLabelById = async (id) => {
  if (!id) return null;

  const session = await getServerSession(nextAuthConfig);

  try {
    const label = await prisma.labels.findFirst({
      where: {
        id: parseInt(id),
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

    return {
      ...label,
      tasks: label.tasks.map((t) => ({
        ...t.task,
        labels: t.task.labels.map((l) => ({
          id: l.label.id,
          name: l.label.name,
        })),
      })),
    };
  } catch (err) {
    console.log(err);
    return null;
  }
};
