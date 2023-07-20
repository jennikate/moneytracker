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
      // Get paymentSource current balance
      const idToNum = Number(paymentSourceId);
      // TODO: learn how to type this to a number without the '-null-is-not-assignable-to-type-'
      const balanceStart: any = await prisma.payment.findUnique({
        where: {
          id: idToNum,
        },
      });
      const newBalance = balanceStart.balance - amount;

      // Add new balance
      const balanceResult = await prisma.paymentSource.update({
        where: { id: Number(paymentSourceId) },
        data: {
          balance: newBalance // if I make this just a number it works, so need to work out how to wait to GET the balance and then use it here
        }
      });

      // Add pamyment
      const payResult = await prisma.payment.create({
        data: {
          expenseType:  { connect: { id: expenseTypeId } },
          paymentSource: { connect: { id: paymentSourceId } },
          paymentType:  { connect: { id: paymentTypeId } },
          recipient: { connect: { id: recipientId }},
          date,
          amount
        }
      });
      
      // TODO concat results and return both not just pay result
      console.log(payResult)
      res.json(balanceResult)
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
  app.get('/expense-type', async (req, res) => {
    const expenseTypes = await prisma.expenseType.findMany()
    res.send(expenseTypes)
  });
  
  app.get('/payment-source', async (req, res) => {
    const paymentSources = await prisma.paymentSource.findMany()
    res.send(paymentSources)
  });
  
  app.get('/payment-source/:id', async (req, res) => {
    const idToNum = Number(req.params.id);
    const paymentSource = await prisma.payment.findUnique({
      where: {
        id: idToNum,
      },
    });
    res.send(paymentSource)
  });
  
  app.get('/payment-type', async (req, res) => {
    const paymentTypes = await prisma.paymentType.findMany()
    res.send(paymentTypes)
  });
  
  app.get('/recipient', async (req, res) => {
    const recipients = await prisma.recipient.findMany()
    res.send(recipients)
  });
  
  app.get('/payments', async (req, res) => {
    /**
     * potential query's
     * - expense=expenseType.id
     * - paymentSource=paymentSource.id
     * - paymentType=paymentType.id
     * - recipient=recipient.id
     * - dateStart=UTCdate
     * - dateEnd=UTCdate
     */

    const query = req.query;
    const queryExpenseTypeId = Number(query.expense);
    const queryPaymentSourceId = Number(query.paymentSource);
    const queryPaymentTypeId = Number(query.paymentType);
    const queryRecipientId = Number(query.recipient);
    const dateStart = query.dateStart ? new Date(query.dateStart as any) : undefined;
    const dateEnd = query.dateEnd ? new Date(query.dateEnd as any) : undefined;

    const payments = await prisma.payment.findMany({
      where: {
        AND: {
          ...(queryExpenseTypeId ? { expenseTypeId: queryExpenseTypeId } : undefined),
          ...(queryPaymentSourceId ? { paymentSourceId: queryPaymentSourceId } : undefined),
          ...(queryPaymentTypeId ? { paymentTypeId: queryPaymentTypeId } : undefined),
          ...(queryRecipientId ? { recipientId: queryRecipientId } : undefined),
            OR: [
              { date: { lte: dateEnd, gte: dateStart } },
           ],
        }
      },
    })
    res.send(payments)
  });
  
  app.get('/payments/:id', async (req, res) => {
    const idToNum = Number(req.params.id);
    const payment = await prisma.payment.findUnique({
      where: {
        id: idToNum,
      },
    });
    res.send(payment)
  });

  /**
   * UPDATE
   */
  app.put('/payment-source/new-balance/:id', async (req, res) => {
    const { id } = req.params
    const { balance, label } = req.body
    try {
      const result = await prisma.paymentSource.update({
        where: { id: Number(id) },
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

  app.put('/payments/:id', async (req, res) => {
    const { id } = req.params
    const { expenseTypeId, paymentSourceId, paymentTypeId, recipientId, date, amount } = req.body;

    try {
      const result = await prisma.payment.update({
        where: { id: Number(id) },
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
   * DELETE: currently only allow to delete a specific payment via UI
   */
  app.delete('/payments/:id', async (req, res) => {
    const idToNum = Number(req.params.id);
    const deleteItem = await prisma.payment.delete({
      where: {
        id: idToNum,
      },
    });
    res.send(deleteItem);
  });

const server = app.listen(5000, () => 
console.log('Server ready at localhost 5000'))