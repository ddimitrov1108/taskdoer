import { nextAuthConfig } from "@/lib/next-auth-config";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sectionNameRegex } from "@/lib/regex";
import { doesLabelExist } from "../api-utils";

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
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again latyer." },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  const { name } = await req.json();

  if (!name)
    return NextResponse.json({ error: "Invalid field." }, { status: 400 });

  if (!sectionNameRegex.test(name))
    return NextResponse.json({ error: "Invalid field." }, { status: 400 });

  const session = await getServerSession(nextAuthConfig);
  const formattedName = name.toLowerCase().replace(/\s+/g, "-");

  try {
    const doexExist = await doesLabelExist(session.user.id, formattedName);

    if (doexExist) {
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
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again latyer." },
      { status: 500 }
    );
  }
}
