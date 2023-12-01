import { prisma } from "@/lib/prisma";
import { validateIdParam } from "../../api-utils";
import { getServerSession } from "next-auth";
import { nextAuthConfig } from "@/lib/next-auth-config";
import { NextResponse } from "next/server";

const getTaskById = async (id) => {
  return await prisma.tasks.findUnique({
    where: {
      id,
    },
    include: {
      labels: true,
      project: true,
    },
  });
};

export async function PUT(req, { params }) {
  if (!validateIdParam(params.id))
    return NextResponse.json({}, { status: 400 });

  const session = await getServerSession(nextAuthConfig);
  const data = await req.json();
  const id = parseInt(params.id);

  try {
    const task = await getTaskById(id);

    if (!task) return NextResponse.json({}, { status: 404 });

    if (task.project.uid != session.user.id)
      return NextResponse.json({}, { status: 403 });

    await prisma.tasks.update({
      where: {
        id,
      },
      data,
    });

    if (data.labels.length) {
      task.labels.forEach(async (l) => {
        if (data.labels.find((o) => o.id === l.id)) return;

        await prisma.taskToLabel.delete({
          data: {
            taskId: task.id,
            labelId: l.id,
          },
        });
      });

      data.labels.forEach(async (l) => {
        if (task.labels.find((o) => o.id === l.id)) return;

        await prisma.taskToLabel.create({
          data: {
            taskId: task.id,
            labelId: l.id,
          },
        });
      });
    } else {
      await prisma.taskToLabel.deleteMany({
        where: {
          taskId: task.id,
        },
      });
    }

    return NextResponse.json({}, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({}, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  if (!validateIdParam(params.id))
    return NextResponse.json({}, { status: 400 });

  const session = await getServerSession(nextAuthConfig);
  const id = parseInt(params.id);

  try {
    const task = await getTaskById(id);

    if (task) {
      if (task.project.uid === session.user.id) {
        if (task.labels.length) {
          await prisma.taskToLabel.deleteMany({
            where: {
              id: task.labels[0].id,
            },
          });
        }

        await prisma.tasks.delete({
          where: {
            id: task.id,
          },
        });
      }
    }

    return NextResponse.json({}, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({}, { status: 500 });
  }
}
