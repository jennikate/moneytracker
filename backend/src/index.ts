import { Prisma, PrismaClient } from '@prisma/client'
import cors from 'cors'
import express from 'express'

const prisma = new PrismaClient();
const app = express()

app.use(express.json())
app.use(cors())

  // FUNCTIONS (to move to own files?)
  const getSourceBalance = async (id: string) => {
    const idToNum = Number(id);
    const paymentSource = await prisma.paymentSource.findUnique({
      where: {
        id: idToNum,
      },
    });
    return(paymentSource);
  }
  
  /**
   * CREATE
   */

  app.post('/payment-source/desposit/:id', async (req, res) => {
    const depositAmt = Number(req.body.balance);
    const paymentSource: any = await getSourceBalance(req.params.id);
    const newBalance: number = paymentSource ? paymentSource.balance + depositAmt : depositAmt;

    try {
      const response = await prisma.paymentSource.update({
        where: { id: Number(req.params.id) },
        data: {
          balance: newBalance
        }
      });

      res.json(response)
    } catch (error) {
      let errorResponse;
      if (error instanceof Prisma.PrismaClientValidationError) {
        errorResponse = error.message
      } else if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
        errorResponse = error.meta
      } else {
        console.log(error)
        errorResponse = error
      }
      res.json(errorResponse)
    }
  });

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
        errorResponse = error
      }
      res.json(errorResponse)
    } 
  });

  app.post('/payment-source', async (req, res) => {
    const { balance, label, paymentTypeId } = req.body
    try {
      const result = await prisma.paymentSource.create({
        data: {
          balance,
          label,
          paymentTypeId,
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
        errorResponse = error
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
        errorResponse = error
      }
      res.json(errorResponse)
    }  
  });

  app.post('/recipient', async (req, res) => {
    const { name, expenseTypeId } = req.body
    try {
      const result = await prisma.recipient.create({
        data: {
          name,
          expenseTypeId
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
        errorResponse = error
      }
      res.json(errorResponse)
    } 
  });

  app.post('/payment', async (req, res) => {
    const { expenseTypeId, paymentSourceId, paymentTypeId, recipientId, date, amount } = req.body
    const paymentSource: any = await getSourceBalance(paymentSourceId);
    const newBalance: number = paymentSource ? paymentSource.balance - amount : amount;
    try {
      // Add new balance
      await prisma.paymentSource.update({
        where: { id: Number(paymentSourceId) },
        data: {
          balance: newBalance
        }
      });

      // Add pamyment
      await prisma.payment.create({
        data: {
          expenseType:  { connect: { id: expenseTypeId } },
          paymentSource: { connect: { id: paymentSourceId } },
          paymentType:  { connect: { id: paymentTypeId } },
          recipient: { connect: { id: recipientId }},
          date,
          amount
        }
      });
      
      // TODO improve response
      // TODO improve error handling
      res.json('success')
    } catch (error) {
      let errorResponse;
      if (error instanceof Prisma.PrismaClientValidationError) {
        errorResponse = error.message
      } else if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
        errorResponse = error.meta
      } else {
        console.log(error)
        errorResponse = error
      }
      res.json(errorResponse)
    } 
  });

  app.post('/payment-source/withdraw/:id', async (req, res) => {
    const depositAmt = Number(req.body.balance);
    const paymentSource: any = await getSourceBalance(req.params.id);
    const newBalance: number = paymentSource ? paymentSource.balance - depositAmt : depositAmt;

    try {
      const response = await prisma.paymentSource.update({
        where: { id: Number(req.params.id) },
        data: {
          balance: newBalance
        }
      });

      res.json(response)
    } catch (error) {
      let errorResponse;
      if (error instanceof Prisma.PrismaClientValidationError) {
        errorResponse = error.message
      } else if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
        errorResponse = error.meta
      } else {
        console.log(error)
        errorResponse = error
      }
      res.json(errorResponse)
    }
  });

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
      include: {
        paymentSource: true
      }
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

  app.get('/recipient/:id', async (req, res) => {
    const idToNum = Number(req.params.id);
    const recipients = await prisma.recipient.findUnique({
      where: {
        id: idToNum
      },
      include: {
        defaultExpenseType: true
      }
    })
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
      include: {
        expenseType: true,
        paymentSource: true,
        paymentType: true,
        recipient: true
      }
    })
    res.send(payments)
  });
  
  app.get('/payments/:id', async (req, res) => {
    const idToNum = Number(req.params.id);
    const payment = await prisma.payment.findUnique({
      where: {
        id: idToNum,
      },
      include: {
        expenseType: true,
        paymentSource: true,
        paymentType: true,
        recipient: true
      }
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
        errorResponse = error
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
        errorResponse = error
      }
      res.json(errorResponse)
    } 
  })

  /**
   * DELETE: currently only allow to delete a specific payment via UI
   */
  app.delete('/expense-type/:id', async (req, res) => {
    const idToNum = Number(req.params.id);

    try {
      const deleteItem = await prisma.expenseType.delete({
        where: {
          id: idToNum,
        },
      });

      res.json(deleteItem)
    } catch (error) {
      let errorResponse;
      if (error instanceof Prisma.PrismaClientValidationError) {
        errorResponse = error.message
      } else if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
        errorResponse = error.meta
      } else {
        console.log(error)
        errorResponse = error
      }
      res.json(errorResponse)
    }
  });

  app.delete('/payment-source/:id', async (req, res) => {
    const idToNum = Number(req.params.id);
    try {
      const deleteItem = await prisma.paymentSource.delete({
        where: {
          id: idToNum,
        },
      });

      res.json(deleteItem)
    } catch (error) {
      let errorResponse;
      if (error instanceof Prisma.PrismaClientValidationError) {
        errorResponse = error.message
      } else if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
        errorResponse = error.meta
      } else {
        console.log(error)
        errorResponse = error
      }
      res.json(errorResponse)
    }
  });

  app.delete('/payment-type/:id', async (req, res) => {
    const idToNum = Number(req.params.id);
    try {
      const deleteItem = await prisma.paymentType.delete({
        where: {
          id: idToNum,
        },
      });

      res.json(deleteItem)
    } catch (error) {
      let errorResponse;
      if (error instanceof Prisma.PrismaClientValidationError) {
        errorResponse = error.message
      } else if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
        errorResponse = error.meta
      } else {
        console.log(error)
        errorResponse = error
      }
      res.json(errorResponse)
    }
  });

  app.delete('/recipient/:id', async (req, res) => {
    const idToNum = Number(req.params.id);
    try {
      const deleteItem = await prisma.recipient.delete({
        where: {
          id: idToNum,
        },
      });

      res.json(deleteItem)
    } catch (error) {
      let errorResponse;
      if (error instanceof Prisma.PrismaClientValidationError) {
        errorResponse = error.message
      } else if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
        errorResponse = error.meta
      } else {
        console.log(error)
        errorResponse = error
      }
      res.json(errorResponse)
    }
  });

  app.delete('/payments/:id', async (req, res) => {
    const idToNum = Number(req.params.id);
    try {
      const deleteItem = await prisma.recipient.delete({
        where: {
          id: idToNum,
        },
      });

      res.json(deleteItem)
    } catch (error) {
      let errorResponse;
      if (error instanceof Prisma.PrismaClientValidationError) {
        errorResponse = error.message
      } else if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
        errorResponse = error.meta
      } else {
        console.log(error)
        errorResponse = error
      }
      res.json(errorResponse)
    }
  });

const server = app.listen(5000, () => 
console.log('Server ready at localhost 5000'))
