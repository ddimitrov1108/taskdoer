import { nextAuthConfig } from "@/lib/next-auth-config";
import { prisma } from "@/lib/prisma";
import { hexColorRegex, sectionNameRegex } from "@/lib/regex";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req) {
  const session = await getServerSession(nextAuthConfig);
  const { name, color } = await req.json();

  if (!name || !color)
    return NextResponse.json({ error: "Invalid field." }, { status: 400 });

  if (!sectionNameRegex.test(name) || !hexColorRegex.test(color))
    return NextResponse.json({ error: "Invalid field." }, { status: 400 });

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
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again latyer." },
      { status: 500 }
    );
  }
}
