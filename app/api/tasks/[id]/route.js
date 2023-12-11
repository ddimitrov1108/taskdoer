import { prisma } from "@/lib/prisma";
import { validateIdParam } from "../../api-utils";
import { getServerSession } from "next-auth";
import { nextAuthConfig } from "@/lib/next-auth-config";
import { NextResponse } from "next/server";
import { descriptionRegex, sectionNameRegex } from "@/lib/regex";
import { isValid, parseISO } from "date-fns";

export async function PUT(req, { params }) {
  if (!validateIdParam(params.id))
    return NextResponse.json({ error: "Bad Request." }, { status: 400 });

  const {
    labels: incomingLabels,
    editLabels = false,
    name,
    description,
    dueDate,
    important,
  } = await req.json();

  if (!name || !dueDate)
    return NextResponse.json({ error: "Bad Request." }, { status: 400 });

  if (
    !sectionNameRegex.test(name) ||
    (description && !descriptionRegex.test(description)) ||
    !isValid(parseISO(dueDate)) ||
    typeof important != "boolean" ||
    typeof editLabels != "boolean" ||
    !Array.isArray(incomingLabels)
  )
    return NextResponse.json({ error: "Bad Request." }, { status: 400 });

  const session = await getServerSession(nextAuthConfig);
  const taskId = parseInt(params.id);

  try {
    const taskToUpdate = await prisma.tasks.findUnique({
      where: {
        id: taskId,
        uid: session.user.id,
      },
      include: {
        labels: true,
        project: true,
      },
    });

    if (!taskToUpdate) return NextResponse.json({}, { status: 404 });

    await prisma.tasks.update({
      where: {
        id: taskToUpdate.id,
      },
      data: {
        name,
        description,
        dueDate,
        important,
      },
    });

    if (editLabels) {
      if (incomingLabels?.length) {
        const incomingLabelIds = incomingLabels.map((label) => label.id);
        const existingLabelIds = taskToUpdate.labels.map(
          (label) => label.labelId
        );

        console.log(incomingLabelIds, existingLabelIds);

        const existingLabelIdsSet = new Set(existingLabelIds);

        const differentLabels =
          incomingLabelIds.length !== existingLabelIds.length ||
          !incomingLabelIds.every((id) => existingLabelIdsSet.has(id));

        if (differentLabels) {
          await prisma.taskToLabel.deleteMany({
            where: {
              taskId: taskToUpdate.id,
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
                taskId: taskToUpdate.id,
                labelId: labelToAdd.id,
              },
            });

            if (!existingEntry) {
              await prisma.taskToLabel.create({
                data: {
                  taskId: taskToUpdate.id,
                  labelId: labelToAdd.id,
                },
              });
            }
          }
        }
      } else {
        await prisma.taskToLabel.deleteMany({
          where: {
            taskId: taskToUpdate.id,
          },
        });
      }
    }

    return NextResponse.json({}, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again later." },
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  if (!validateIdParam(params.id))
    return NextResponse.json({ error: "Bad Request." }, { status: 400 });

  const session = await getServerSession(nextAuthConfig);
  const taskId = parseInt(params.id);

  try {
    const taskToDelete = await prisma.tasks.findFirst({
      where: {
        id: taskId,
        uid: session.user.id,
      },
      include: {
        labels: true,
        project: true,
      },
    });

    if (!taskToDelete)
      return NextResponse.json({ error: "Task not found." }, { status: 404 });

    if (taskToDelete?.labels?.length) {
      await prisma.taskToLabel.deleteMany({
        where: {
          taskId: taskToDelete.id,
        },
      });
    }

    await prisma.tasks.delete({
      where: {
        id: taskToDelete.id,
      },
    });

    return NextResponse.json({}, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again later." },
      { status: 500 }
    );
  }
}
