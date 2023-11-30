import { nextAuthConfig } from "@/lib/next-auth-config";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";

const errData = {
  data: [],
  count: 0,
};

export const getProjects = async () => {
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
    return errData;
  }
};

export const getLabels = async () => {
  const session = await getServerSession(nextAuthConfig);

  try {
    return await prisma.labels.findMany({
      where: {
        uid: session.user.id,
      },
      select: {
        id: true,
        name: true,
      },
    });
  } catch (err) {
    console.log(err);
    return errData;
  }
};
