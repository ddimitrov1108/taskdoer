import { nextAuthConfig } from "@/lib/next-auth-config";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";

export const getProjectById = async (id) => {
  if (!id) return null;

  const session = await getServerSession(nextAuthConfig);

  try {
    const project = await prisma.projects.findFirst({
      where: {
        id: parseInt(id),
        uid: session.user.id,
      },
      select: {
        id: true,
        name: true,
        color: true,
        tasks: {
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
    });

    return {
      ...project,
      tasks: project.tasks.map((t) => ({
        ...t,
        labels: t.labels.map((l) => ({ id: l.label.id, name: l.label.name })),
      })),
    };
  } catch (err) {
    console.log(err);
    return null;
  }
};
