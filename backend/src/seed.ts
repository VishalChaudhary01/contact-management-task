import { prisma } from "./app";

async function main() {
  const edward = await prisma.contactInfo.upsert({
    where: { email: "edward@example.com" },
    update: {},
    create: {
      firstName: "Edward",
      lastName: "Elric",
      email: "edward@example.com",
      company: "alchemy.com",
      phoneNumber: "5555555555",
      jobTitle: "Alchemist",
    },
  });
  const bob = await prisma.contactInfo.upsert({
    where: { email: "bob@example.com" },
    update: {},
    create: {
      firstName: "Bob",
      lastName: "Builder",
      email: "bob@example.com",
      company: "buildit.com",
      phoneNumber: "2222222222",
      jobTitle: "Construction Manager",
    },
  });
  const charlie = await prisma.contactInfo.upsert({
    where: { email: "charlie@example.com" },
    update: {},
    create: {
      firstName: "Charlie",
      lastName: "Chap",
      email: "charlie@example.com",
      company: "chaplin.com",
      phoneNumber: "3333333333",
      jobTitle: "Actor",
    },
  });
  const alice = await prisma.contactInfo.upsert({
    where: { email: "alice@example.com" },
    update: {},
    create: {
      firstName: "Alice",
      lastName: "Alc",
      email: "alice@example.com",
      company: "alc.com",
      phoneNumber: "1111111111",
      jobTitle: "Frontend Developer",
    },
  });
  const diana = await prisma.contactInfo.upsert({
    where: { email: "diana@example.com" },
    update: {},
    create: {
      firstName: "Diana",
      lastName: "Prince",
      email: "diana@example.com",
      company: "amazon.com",
      phoneNumber: "4444444444",
      jobTitle: "Warrior",
    },
  });
  console.log({ alice })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })