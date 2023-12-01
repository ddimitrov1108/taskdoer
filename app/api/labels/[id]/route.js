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
  const labelId = parseInt(params.id);

  try {
    const label = await prisma.labels.findFirst({
      where: {
        id: labelId,
        uid: session.user.id,
      },
      include: {
        tasks: true,
      },
    });

    if (label) {
      await prisma.taskToLabel.deleteMany({
        where: {
          labelId: label.id,
        },
      });

      await prisma.labels.delete({
        where: {
          id: label.id,
        },
      });
    }

    return NextResponse.json({}, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({}, { status: 500 });
  }
}
