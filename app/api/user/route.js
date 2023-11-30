import { nextAuthConfig } from "@/lib/next-auth-config";
import { getLabels, getProjects } from "@/db/user";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(req) {
  const session = await getServerSession(nextAuthConfig);

  try {
    const [nav, projects, labels] = await Promise.all([
      getProjects(),
      getLabels(),
    ]);

    return NextResponse.json(
      { user: session.user, nav, projects, labels },
      { status: 200 }
    );
  } catch (err) {
    console.log(err);
    return NextResponse({}, { status: 500 });
  }
}
