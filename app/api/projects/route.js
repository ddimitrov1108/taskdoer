import { nextAuthConfig } from "@/lib/next-auth-config";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req) {
  const session = await getServerSession(nextAuthConfig);
  const data = await req.json();

  try {
    const newProject = await prisma.projects.create({
      data: {
        ...data,
        uid: session.user.id,
      },
    });

    return NextResponse.json(
      { href: `/todo/projects/${newProject.id}` },
      { status: 200 }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json({}, { status: 500 });
  }
}
