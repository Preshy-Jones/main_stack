import { Prisma, PrismaClient, User } from "@prisma/client";
const prisma = new PrismaClient();

export const userFindFirst = async (
  where: Prisma.UserWhereInput,
  include?: Prisma.UserInclude
): Promise<User | null> => {
  return prisma.user.findFirst({
    where,
    ...(include && { include }),
  });
};

export const userCreate = async (
  data: Prisma.UserCreateInput
): Promise<User> => {
  return prisma.user.create({ data });
};
