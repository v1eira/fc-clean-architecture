import express, { Request, Response } from 'express'
import CreateCustomerUseCase from '../../../usecase/customer/create/create.customer.usecase'
import CustomerRepository from '../../customer/repository/sequelize/customer.repository'
import ListCustomerUseCase from '../../../usecase/customer/list/list.customer.usecase'

export const customerRoute = express.Router()

customerRoute.post('/', async (req: Request, res: Response) => {
  const createCustomerUseCase = new CreateCustomerUseCase(
    new CustomerRepository(),
  )
  try {
    const customerDto = {
      name: req.body.name,
      address: {
        street: req.body.address.street,
        city: req.body.address.city,
        number: req.body.address.number,
        zip: req.body.address.zip,
      },
    }
    const output = await createCustomerUseCase.execute(customerDto)
    res.send(output)
  } catch (error) {
    res.status(500).send(error)
  }
})

customerRoute.get('/', async (req: Request, res: Response) => {
  const listCustomerUseCase = new ListCustomerUseCase(new CustomerRepository())
  try {
    const output = await listCustomerUseCase.execute({})
    res.send(output)
  } catch (error) {
    res.status(500).send(error)
  }
})
