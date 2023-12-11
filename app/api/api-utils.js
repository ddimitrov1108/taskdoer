import { prisma } from "@/lib/prisma";

export const validateIdParam = (id) =>
  id != undefined || id != null || parseInt(id);

export const doesLabelExist = async (userId, name) => {
  const doesExist = await prisma.labels.findFirst({
    where: {
      uid: userId,
      name,
    },
  });

  return !!doesExist;
};
