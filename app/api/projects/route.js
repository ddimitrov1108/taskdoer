import { nextAuthConfig } from "@/lib/next-auth-config";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { hexColorRegex, sectionNameRegex } from "@/lib/regex";

export async function POST(req) {
  const session = await getServerSession(nextAuthConfig);
  const { name, color } = await req.json();

  if (!name || !color)
    return NextResponse.json({ error: "Invalid fields." }, { status: 400 });

  if (!sectionNameRegex.test(name) || !hexColorRegex.test(color))
    return NextResponse.json({ error: "Invalid fields." }, { status: 400 });

  try {
    const newProject = await prisma.projects.create({
      data: {
        name,
        color,
        uid: session.user.id,
      },
    });

    return NextResponse.json(
      { href: `/todo/projects/${newProject.id}` },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again later." },
      { status: 500 }
    );
  }
}
