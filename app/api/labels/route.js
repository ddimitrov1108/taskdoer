import { nextAuthConfig } from "@/lib/next-auth-config";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sectionNameRegex } from "@/lib/regex";
import { findLabelDuplicate } from "../api-utils";

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

    return NextResponse.json(labels, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again later." },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  const { name } = await req.json();

  if (!name)
    return NextResponse.json({ error: "Invalid fields." }, { status: 400 });

  if (!sectionNameRegex.test(name))
    return NextResponse.json({ error: "Invalid fields." }, { status: 400 });

  const session = await getServerSession(nextAuthConfig);
  const formattedName = name.toLowerCase().replace(/\s+/g, "-");

  try {
    const isDuplicate = await findLabelDuplicate(
      session.user.id,
      formattedName
    );

    if (isDuplicate) {
      return NextResponse.json(
        { error: "The label already exists! Please try another name." },
        { status: 409 }
      );
    }

    await prisma.labels.create({
      data: {
        uid: session.user.id,
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
