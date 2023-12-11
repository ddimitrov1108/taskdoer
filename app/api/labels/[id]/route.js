import { prisma } from "@/lib/prisma";
import { findLabelDuplicate, validateIdParam } from "../../api-utils";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { nextAuthConfig } from "@/lib/next-auth-config";
import { sectionNameRegex } from "@/lib/regex";

export async function PUT(req, { params }) {
  if (!validateIdParam(params.id))
    return NextResponse.json({ error: "Bad Request." }, { status: 400 });

  const { name } = await req.json();

  if (!name)
    return NextResponse.json({ error: "Invalid fields." }, { status: 400 });

  if (!sectionNameRegex.test(name))
    return NextResponse.json({ error: "Invalid fields." }, { status: 400 });

  const session = await getServerSession(nextAuthConfig);
  const formattedName = name.toLowerCase().replace(/\s+/g, "-");
  const labelId = parseInt(params.id);

  try {
    const isDuplicate = await findLabelDuplicate(session.user.id, formattedName);

    if (isDuplicate) {
      return NextResponse.json(
        { error: "The label already exists! Please try another name." },
        { status: 409 }
      );
    }

    await prisma.labels.update({
      where: {
        id: labelId,
        uid: session.user.id,
      },
      data: {
        name: formattedName,
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
export async function DELETE(req, { params }) {
  if (!validateIdParam(params.id))
    return NextResponse.json({ error: "Bad Request." }, { status: 400 });

  const session = await getServerSession(nextAuthConfig);
  const labelId = parseInt(params.id);

  try {
    const labelToDelete = await prisma.labels.findFirst({
      where: {
        id: labelId,
        uid: session.user.id,
      },
      include: {
        tasks: true,
      },
    });

    if (!labelToDelete)
      return NextResponse.json({ error: "Label not found." }, { status: 404 });

    await prisma.$transaction([
      prisma.taskToLabel.deleteMany({
        where: {
          labelId: labelToDelete.id,
        },
      }),
      prisma.labels.delete({
        where: {
          id: labelToDelete.id,
        },
      }),
    ]);

    return NextResponse.json({}, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again later." },
      { status: 500 }
    );
  }
}
