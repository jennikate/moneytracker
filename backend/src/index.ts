import { Prisma, PrismaClient } from '@prisma/client'
import cors from 'cors'
import express from 'express'

const prisma = new PrismaClient();
const app = express()

app.use(express.json())
app.use(cors())

// async function main() {
  // ... you will write your Prisma Client queries here
  
  /**
   * CREATE
   */
  app.post('/expense-type', async (req, res) => {
    const { label } = req.body
    
    try {
      const result = await prisma.expenseType.create({
        data: {
          label
        }
      })
      res.json(result)
    } catch (error) {
      let errorResponse;
      if (error instanceof Prisma.PrismaClientValidationError) {
        errorResponse = 'Missing field make sure label exists'
      } else if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
        errorResponse = 'Expense type already exists'
      } else {
        errorResponse = 'Something has gone wrong'
      }
      res.json(errorResponse)
    } 
  });

  app.post('/payment-source', async (req, res) => {
    const { balance, label } = req.body
    try {
      const result = await prisma.paymentSource.create({
        data: {
          balance,
          label
        }
      })
      res.json(result)
    } catch (error) {
      let errorResponse;
      if (error instanceof Prisma.PrismaClientValidationError) {
        errorResponse = 'Missing field make sure label & balance exists'
      } else if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
        errorResponse = 'Payment type already exists'
      } else {
        errorResponse = 'Something has gone wrong'
      }
      res.json(errorResponse)
    }  
  });

  app.post('/payment-type', async (req, res) => {
    const { label } = req.body
    try {
      const result = await prisma.paymentType.create({
        data: {
          label
        }
      })
      res.json(result)
    } catch (error) {
      let errorResponse;
      if (error instanceof Prisma.PrismaClientValidationError) {
        errorResponse = 'Missing field make sure label exists'
      } else if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
        errorResponse = 'Payment type already exists'
      } else {
        errorResponse = 'Something has gone wrong'
      }
      res.json(errorResponse)
    }  
  });

  app.post('/recipient', async (req, res) => {
    const { name } = req.body
    try {
      const result = await prisma.recipient.create({
        data: {
          name
        }
      })
      res.json(result)
    } catch (error) {
      let errorResponse;
      if (error instanceof Prisma.PrismaClientValidationError) {
        errorResponse = 'Missing field make sure label exists'
      } else if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
        errorResponse = 'Payment type already exists'
      } else {
        errorResponse = 'Something has gone wrong'
      }
      res.json(errorResponse)
    } 
  });

  app.post('/payment', async (req, res) => {
    const { expenseTypeId, paymentSourceId, paymentTypeId, recipientId, date, amount } = req.body
    try {
      const result = await prisma.payment.create({
        data: {
          expenseType:  { connect: { id: expenseTypeId } },
          paymentSource: { connect: { id: paymentSourceId } },
          paymentType:  { connect: { id: paymentTypeId } },
          recipient: { connect: { id: recipientId }},
          date,
          amount
        }
      })
      res.json(result)
    } catch (error) {
      let errorResponse;
      if (error instanceof Prisma.PrismaClientValidationError) {
        errorResponse = error.message
      } else if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
        errorResponse = error.meta
      } else {
        console.log(error)
        errorResponse = 'Something has gone wrong'
      }
      res.json(errorResponse)
    } 
  })


  /**
   * READ
   */
  // Get ALL expense types
  // const expenseTypes = await prisma.expenseType.findMany()
  // console.log(expenseTypes)

// 

const server = app.listen(5000, () => 
console.log('Server ready at localhost 5000'))
