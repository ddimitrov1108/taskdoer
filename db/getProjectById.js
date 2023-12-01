import { nextAuthConfig } from "@/lib/next-auth-config";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";

const getProjectById = async (id) => {
  if (!id) return null;

  const session = await getServerSession(nextAuthConfig);
  const projectId = parseInt(id);

  try {
    const project = await prisma.projects.findFirst({
      where: {
        id: projectId,
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

    if (!project?.tasks.length) return project;

    return {
      ...project,
      tasks: project.tasks.map(({ labels, ...restTask }) => ({
        ...restTask,
        labels: labels.map(({ label }) => ({ ...label })),
      })),
    };
  } catch (err) {
    console.log(err);
    return null;
  }
};

export default getProjectById;
