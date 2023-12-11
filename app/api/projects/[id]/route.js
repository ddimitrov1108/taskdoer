import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { nextAuthConfig } from "@/lib/next-auth-config";
import { prisma } from "@/lib/prisma";
import { hexColorRegex, sectionNameRegex } from "@/lib/regex";
import { validateIdParam } from "../../api-utils";

export async function PUT(req, { params }) {
  if (!validateIdParam(params.id))
    return NextResponse.json({ error: "Bad Request." }, { status: 400 });

  const { name, color } = await req.json();

  if (!name || !color)
    return NextResponse.json({ error: "Invalid fields." }, { status: 400 });

  if (!sectionNameRegex.test(name) || !hexColorRegex.test(color))
    return NextResponse.json({ error: "Invalid fields." }, { status: 400 });

  const session = await getServerSession(nextAuthConfig);
  const projectId = parseInt(params.id);

  try {
    await prisma.projects.update({
      where: {
        id: projectId,
        uid: session.user.id,
      },
      data: {
        name,
        color,
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
  const projectId = parseInt(params.id);

  try {
    const projectToDelete = await prisma.projects.findUnique({
      where: {
        id: projectId,
        uid: session.user.id,
      },
      include: {
        tasks: {
          include: {
            labels: true,
          },
        },
      },
    });

    if (!projectToDelete)
      return NextResponse.json(
        { error: "Project not found." },
        { status: 404 }
      );

    const labelsToDelete = projectToDelete.tasks.flatMap((task) => task.labels);

    await prisma.$transaction([
      ...labelsToDelete.map((label) =>
        prisma.taskToLabel.deleteMany({
          where: {
            id: label.id,
          },
        })
      ),
      prisma.tasks.deleteMany({
        where: {
          pid: projectToDelete.id,
        },
      }),
      prisma.projects.delete({
        where: {
          id: projectId,
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
