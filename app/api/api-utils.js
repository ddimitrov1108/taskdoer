import { prisma } from "@/lib/prisma";

export const validateIdParam = (id) => !!parseInt(id);

export const findLabelDuplicate = async (userId, name) => {
  const isDuplicate = await prisma.labels.findFirst({
    where: {
      uid: userId,
      name,
    },
  });

  return !!isDuplicate;
};
