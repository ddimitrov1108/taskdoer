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
      projects: true,
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

    if (task.projects.uid != session.user.id)
      return NextResponse.json({}, { status: 403 });

    await prisma.tasks.update({
      where: {
        id,
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
    const task = await getTaskById(id);

    if (!task) return NextResponse.json({}, { status: 404 });

    if (task.projects.uid != session.user.id)
      return NextResponse.json({}, { status: 403 });

    await prisma.tasks.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({}, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({}, { status: 500 });
  }
}
