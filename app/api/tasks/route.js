import { nextAuthConfig } from "@/lib/next-auth-config";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req) {
  const data = await req.json();
  const session = await getServerSession(nextAuthConfig);

  const { pid, labels, editLabels, ...dataToPass } = data;
  const projectId = parseInt(pid);
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

    const newTask = await prisma.tasks.create({
      data: {
        pid: projectId || null,
        uid: userId,
        ...dataToPass,
        completed: false,
      },
    });

    if (editLabels && labels.length) {
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
