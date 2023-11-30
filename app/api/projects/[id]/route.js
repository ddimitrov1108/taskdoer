import { NextResponse } from "next/server";
import { validateIdParam } from "../../api-utils";
import { getServerSession } from "next-auth";
import { nextAuthConfig } from "@/lib/next-auth-config";
import { prisma } from "@/lib/prisma";

export async function PUT(req, { params }) {
  if (!validateIdParam(params.id))
    return NextResponse.json({}, { status: 400 });

  const session = await getServerSession(nextAuthConfig);
  const data = await req.json();
  const id = parseInt(params.id);

  try {
    await prisma.projects.update({
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
    await prisma.$transaction([
      prisma.tasks.deleteMany({
        where: {
          pid: id,
        },
      }),
      prisma.projects.delete({
        where: {
          id,
          uid: session.user.id,
        },
      }),
    ]);

    return NextResponse.json({}, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({}, { status: 500 });
  }
}
