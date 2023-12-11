import { nextAuthConfig } from "@/lib/next-auth-config";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";

const getLabels = async () => {
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
  } catch (error) {
    console.log(error);
    return {
      data: [],
      count: 0,
    };
  }
};

export default getLabels;
