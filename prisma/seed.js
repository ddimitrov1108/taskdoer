const { PrismaClient } = require("@prisma/client");
const { hash } = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  const hashPassword = await hash("test1234$", Number(process.env.HASH_SALT));
  const user = await prisma.users.create({
    data: {
      firstName: "Daniel",
      lastName: "Dimitrov",
      email: "ddimitrov1108@gmail.com",
      hashPassword,
      theme: "#006FEE",
      created_at: undefined,
      updated_at: undefined,
    },
  });

  console.log({ user });
}

main()
  .then(async () => {
    await prisma.$disconnect();
    console.log("Root user created successfully.");
  })
  .catch(async (e) => {
    await prisma.$disconnect();
    console.error(e);
    process.exit(1);
  });
