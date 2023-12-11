import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { nextAuthConfig } from "@/lib/next-auth-config";
import { NextResponse } from "next/server";
import { validateIdParam } from "@/app/api/api-utils";

export async function PUT(req, { params }) {
  if (!validateIdParam(params.id))
    return NextResponse.json({ error: "Bad Request." }, { status: 400 });

  const { completed } = await req.json();

  if (typeof completed != "boolean")
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

    if (!taskToUpdate)
      return NextResponse.json({ error: "Task not found." }, { status: 404 });

    await prisma.tasks.update({
      where: {
        id: taskToUpdate.id,
      },
      data: {
        completed,
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
