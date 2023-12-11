import { prisma } from "@/lib/prisma";
import { validateIdParam } from "../../api-utils";
import { getServerSession } from "next-auth";
import { nextAuthConfig } from "@/lib/next-auth-config";
import { NextResponse } from "next/server";

export async function PUT(req, { params }) {
  if (!validateIdParam(params.id))
    return NextResponse.json({}, { status: 400 });

  const session = await getServerSession(nextAuthConfig);
  const data = await req.json();
  const taskId = parseInt(params.id);

  try {
    const task = await prisma.tasks.findUnique({
      where: {
        id: taskId,
        uid: session.user.id,
      },
      include: {
        labels: true,
        project: true,
      },
    });

    if (!task) return NextResponse.json({}, { status: 404 });

    const { editLabels, labels: incomingLabels, ...dataToUpdate } = data;

    await prisma.tasks.update({
      where: {
        id: task.id,
      },
      data: dataToUpdate,
    });

    if (editLabels) {
      if (incomingLabels?.length) {
        const incomingLabelIds = incomingLabels.map((label) => label.id);
        const existingLabelIds = task.labels.map((label) => label.labelId);

        console.log(incomingLabelIds, existingLabelIds);

        const existingLabelIdsSet = new Set(existingLabelIds);

        const differentLabels =
          incomingLabelIds.length !== existingLabelIds.length ||
          !incomingLabelIds.every((id) => existingLabelIdsSet.has(id));

        if (differentLabels) {
          await prisma.taskToLabel.deleteMany({
            where: {
              taskId: task.id,
              NOT: {
                labelId: {
                  in: incomingLabelIds,
                },
              },
            },
          });

          const labelsToAdd = incomingLabels.filter(
            (label) => !existingLabelIds.includes(label.id)
          );

          for (const labelToAdd of labelsToAdd) {
            const existingEntry = await prisma.taskToLabel.findFirst({
              where: {
                taskId: task.id,
                labelId: labelToAdd.id,
              },
            });

            if (!existingEntry) {
              await prisma.taskToLabel.create({
                data: {
                  taskId: task.id,
                  labelId: labelToAdd.id,
                },
              });
            }
          }
        }
      } else {
        await prisma.taskToLabel.deleteMany({
          where: {
            taskId: task.id,
          },
        });
      }
    }

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
  const taskId = parseInt(params.id);

  try {
    const task = await prisma.tasks.findFirst({
      where: {
        id: taskId,
        uid: session.user.id,
      },
      include: {
        labels: true,
        project: true,
      },
    });

    if (!task) return NextResponse.json({}, { status: 404 });

    if (task?.labels?.length) {
      await prisma.taskToLabel.deleteMany({
        where: {
          taskId: task.id,
        },
      });
    }

    await prisma.tasks.delete({
      where: {
        id: task.id,
      },
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
