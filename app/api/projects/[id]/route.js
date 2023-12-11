import { NextResponse } from "next/server";
import { validateIdParam } from "../../api-utils";
import { getServerSession } from "next-auth";
import { nextAuthConfig } from "@/lib/next-auth-config";
import { prisma } from "@/lib/prisma";

export async function PUT(req, { params }) {
  if (!validateIdParam(params.id))
    return NextResponse.json({}, { status: 400 });

  const session = await getServerSession(nextAuthConfig);
  const data = await req.json();
  const projectId = parseInt(params.id);

  try {
    await prisma.projects.update({
      where: {
        id: projectId,
        uid: session.user.id,
      },
      data,
    });

    return NextResponse.json({}, { status: 200 });
  } catch (err) {
    console.log(err);
        return NextResponse.json(
      { error: "Something went wrong. Please try again latyer." },
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  if (!validateIdParam(params.id))
    return NextResponse.json({}, { status: 400 });

  const session = await getServerSession(nextAuthConfig);
  const projectId = parseInt(params.id);

  try {
    const project = await prisma.projects.findUnique({
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

    if (!project) return NextResponse.json({}, { status: 404 });

    const labelsToDelete = project.tasks.flatMap((task) => task.labels);
    const taskIdsToDelete = project.tasks.map((task) => task.id);

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
          id: {
            in: taskIdsToDelete,
          },
        },
      }),
      prisma.projects.delete({
        where: {
          id: projectId,
        },
      }),
    ]);

    return NextResponse.json({}, { status: 200 });
  } catch (err) {
    console.log(err);
        return NextResponse.json(
      { error: "Something went wrong. Please try again latyer." },
      { status: 500 }
    );
  }
}
