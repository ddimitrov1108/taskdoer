import { nextAuthConfig } from "@/lib/next-auth-config";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";

const getProjects = async () => {
  const session = await getServerSession(nextAuthConfig);

  try {
    return await prisma.projects.findMany({
      where: {
        uid: session.user.id,
      },
      select: {
        id: true,
        name: true,
        color: true,
      },
    });
  } catch (err) {
    console.log(err);
    return {
      data: [],
      count: 0,
    };
  }
};

export default getProjects;
