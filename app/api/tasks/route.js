import { nextAuthConfig } from "@/lib/next-auth-config";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { validateIdParam } from "../api-utils";
import { descriptionRegex, sectionNameRegex } from "@/lib/regex";
import { isValid, parseISO } from "date-fns";

export async function POST(req) {
  const {
    pid,
    labels: incomingLabels,
    editLabels = false,
    name,
    description = "",
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
  const projectId = parseInt(pid);

  try {
    if (projectId) {
      if (!validateIdParam(pid))
        return NextResponse.json({ error: "Bad Request." }, { status: 400 });

      const projectBind = await prisma.projects.findFirst({
        where: {
          id: projectId,
          uid: session.user.id,
        },
      });

      if (!projectBind)
        return NextResponse.json({ error: "Task not found." }, { status: 403 });
    }

    const newTask = await prisma.tasks.create({
      data: {
        pid: projectId || null,
        uid: session.user.id,
        name,
        description,
        dueDate,
        important,
        completed: false,
      },
    });

    if (editLabels && incomingLabels.length) {
      await prisma.$transaction(
        incomingLabels.map((l) =>
          prisma.taskToLabel.create({
            data: {
              taskId: newTask.id,
              labelId: l.id,
            },
          })
        )
      );
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
