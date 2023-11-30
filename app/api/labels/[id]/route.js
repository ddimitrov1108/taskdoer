import { prisma } from "@/lib/prisma";
import { validateIdParam } from "../../api-utils";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { nextAuthConfig } from "@/lib/next-auth-config";

export async function PUT(req, { params }) {
  if (!validateIdParam(params.id))
    return NextResponse.json({}, { status: 400 });

  const session = await getServerSession(nextAuthConfig);
  const data = await req.json();
  const id = parseInt(params.id);

  try {
    await prisma.labels.update({
      where: {
        id,
        uid: session.user.id,
      },
      data,
    });

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
    const tasks = await prisma.tasks.findMany({
      where: {
        lid: {
          contains: params.id,
        },
      },
      include: {
        project: true,
      },
    });

    tasks.forEach(async (task) => {
      if (task.projects.uid != session.user.id) return;

      const newLid = JSON.parse(task.lid).filter((lid) => lid != id);

      await prisma.tasks.update({
        where: {
          id: task.id,
        },
        data: {
          lid: newLid ? JSON.stringify(newLid) : "[]",
        },
      });
    });

    await prisma.labels.delete({
      where: {
        id,
        uid: session.user.id,
      },
    });

    return NextResponse.json({}, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({}, { status: 500 });
  }
}
