import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
async function main() {
  const precious = await prisma.user.upsert({
    where: { email: "adedibuprecious@gmail.com" },
    update: {},
    create: {
      email: "adedibuprecious@gmail.com",
      firstName: "Precious",
      lastName: "Adedibu",
    },
  });
  const joshua = await prisma.user.upsert({
    where: { email: "fadairojosh@gmail.com" },
    update: {},
    create: {
      email: "bob@prisma.io",
      firstName: "Joshua",
      lastName: "Fadairo",
    },
  });
  console.log({ precious, joshua });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
