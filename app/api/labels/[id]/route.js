import { prisma } from "@/lib/prisma";
import { doesLabelExist, validateIdParam } from "../../api-utils";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { nextAuthConfig } from "@/lib/next-auth-config";

export async function PUT(req, { params }) {
  if (!validateIdParam(params.id))
    return NextResponse.json({}, { status: 400 });

  const { name } = await req.json();

  if (!name)
    return NextResponse.json({ error: "Invalid field." }, { status: 400 });

  if (!sectionNameRegex.test(name))
    return NextResponse.json({ error: "Invalid field." }, { status: 400 });

  const session = await getServerSession(nextAuthConfig);
  const formattedName = name.toLowerCase().replace(/\s+/g, "-");
  const labelId = parseInt(params.id);

  try {
    const doexExist = await doesLabelExist(session.user.id, formattedName);

    if (doexExist) {
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
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again latyer." },
      { status: 500 }
    );
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

    if (!label) return NextResponse.json({}, { status: 404 });

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

    return NextResponse.json({}, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again latyer." },
      { status: 500 }
    );
  }
}
