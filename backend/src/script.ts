import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // ... you will write your Prisma Client queries here
  
  /**
   * CREATE
   */
  // const expenseType = await prisma.expenseType.create({
  //   data: {
  //     label: 'test-1'
  //   },
  // })
  // console.log(expenseType)


  /**
   * READ
   */
  // Get ALL expense types
  const expenseTypes = await prisma.expenseType.findMany()
  console.log(expenseTypes)

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
