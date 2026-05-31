const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const users = [
  { name: 'Alice Martin',    email: 'alice@example.com',   languages: ['English', 'French'],             age: 28 },
  { name: 'Carlos Ruiz',     email: 'carlos@example.com',  languages: ['Spanish', 'English', 'Portuguese'], age: 34 },
  { name: 'Yuki Tanaka',     email: 'yuki@example.com',    languages: ['Japanese', 'English'],           age: 22 },
  { name: 'Fatima Al-Hassan',email: 'fatima@example.com',  languages: ['Arabic', 'French', 'English'],   age: 31 },
  { name: 'Priya Sharma',    email: 'priya@example.com',   languages: ['Hindi', 'English'],              age: 26 },
  { name: 'Lena Schmidt',    email: 'lena@example.com',    languages: ['German', 'English', 'French'],   age: 29 },
  { name: 'Ji-ho Park',      email: 'jiho@example.com',    languages: ['Korean', 'English'],             age: 19 },
  { name: 'Marco Bianchi',   email: 'marco@example.com',   languages: ['Italian', 'Spanish'],            age: 41 },
  { name: 'Sofia Chen',      email: 'sofia@example.com',   languages: ['Mandarin', 'English', 'Cantonese'], age: 17 },
  { name: 'Ivan Petrov',     email: 'ivan@example.com',    languages: ['Russian', 'English'],            age: 38 },
  { name: 'Emma Johansson',  email: 'emma@example.com',    languages: ['Swedish', 'English', 'Norwegian'], age: 25 },
  { name: 'Noah Williams',   email: 'noah@example.com',    languages: ['English'],                       age: 16 },
  { name: 'Amara Diallo',    email: 'amara@example.com',   languages: ['French', 'Bambara', 'English'],  age: 23 },
  { name: 'Lucas Oliveira',  email: 'lucas@example.com',   languages: ['Portuguese', 'Spanish', 'English'], age: 15 },
  { name: 'Hana Kovač',      email: 'hana@example.com',    languages: ['Croatian', 'German', 'English'], age: 30 },
];

async function main() {
  console.log('Seeding database...');
  for (const user of users) {
    await prisma.userLanguage.upsert({
      where: { email: user.email },
      update: {},
      create: user,
    });
  }
  console.log(`Seeded ${users.length} users.`);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
