import { nextAuthConfig } from "@/lib/next-auth-config";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { validateIdParam } from "../api-utils";

export async function POST(req) {
  const data = await req.json();
  const session = await getServerSession(nextAuthConfig);
  const projectId = parseInt(data.pid);
  const userId = session.user.id;

  try {
    if (projectId) {
      const projectBind = await prisma.projects.findFirst({
        where: {
          id: projectId,
          uid: userId,
        },
      });

      if (!projectBind) return NextResponse.json({}, { status: 403 });
    }

    const { name, description, dueDate, labels, important } = data;

    const newTask = await prisma.tasks.create({
      data: {
        pid: projectId,
        uid: userId,
        name,
        description,
        dueDate,
        important,
        completed: false,
      },
    });

    if (labels.length) {
      await Promise.all(
        labels.map((l) =>
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
  } catch (err) {
    console.log(err);
    return NextResponse.json({}, { status: 500 });
  }
}
