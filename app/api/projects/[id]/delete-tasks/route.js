import { validateIdParam } from "@/app/api/api-utils";
import { nextAuthConfig } from "@/lib/next-auth-config";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function DELETE(req, { params }) {
  if (!validateIdParam(params.id))
    return NextResponse.json({ error: "Bad Request." }, { status: 400 });

  const session = await getServerSession(nextAuthConfig);
  const projectId = parseInt(params.id);

  try {
    const projectToDeleteTasks = await prisma.projects.findUnique({
      where: {
        id: projectId,
        uid: session.user.id,
      },
      include: {
        tasks: {
          include: {
            labels: true,
          },
        },
      },
    });

    const labelsToDelete = projectToDeleteTasks.tasks.flatMap((task) => task.labels);

    if (!projectToDeleteTasks)
      return NextResponse.json(
        { error: "Project not found." },
        { status: 404 }
      );

    await prisma.$transaction([
      ...labelsToDelete.map((label) =>
        prisma.taskToLabel.deleteMany({
          where: {
            id: label.id,
          },
        })
      ),
      prisma.tasks.deleteMany({
        where: {
          pid: projectToDeleteTasks.id,
        },
      }),
    ]);

    return NextResponse.json({}, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again later." },
      { status: 500 }
    );
  }
}
