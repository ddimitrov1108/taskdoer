import { nextAuthConfig } from "@/lib/next-auth-config";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req) {
  const session = await getServerSession(nextAuthConfig);

  try {
    const labels = await prisma.labels.findMany({
      where: {
        uid: session.user.id,
      },
      select: {
        id: true,
        name: true,
      },
    });

    console.log(labels);

    return NextResponse.json(labels, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({}, { status: 500 });
  }
}

export async function POST(req) {
  const session = await getServerSession(nextAuthConfig);
  const { name } = await req.json();
  const formatedName = name.toLowerCase().replace(/\s+/g, "-");

  try {
    await prisma.labels.create({
      data: {
        uid: session.user.id,
        name: formatedName,
      },
    });

    return NextResponse.json({}, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({}, { status: 500 });
  }
}
