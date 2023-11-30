import { nextAuthConfig } from "@/lib/next-auth-config";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { validateIdParam } from "../api-utils";

export async function POST(req) {
  const data = await req.json();

  if (!validateIdParam(data?.pid))
    return NextResponse.json({}, { status: 400 });

  const session = await getServerSession(nextAuthConfig);
  const id = parseInt(data.pid);

  try {
    const projectBind = await prisma.projects.findFirst({
      where: {
        id,
        uid: session.user.id,
      },
    });

    if (!projectBind) return NextResponse.json({}, { status: 403 });

    const { name, description, dueDate, labels, important } = data;

    const newTask = await prisma.tasks.create({
      data: {
        pid: id,
        name,
        description,
        dueDate,
        important,
        completed: false,
      },
    });

    console.log(newTask);

    if (labels.length > 0) {
      labels.forEach(async (l) => {});
    }

    return NextResponse.json({}, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({}, { status: 500 });
  }
}
