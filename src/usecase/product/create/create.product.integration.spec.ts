// create integration test for create product use case

import { Sequelize } from 'sequelize-typescript'
import ProductModel from '../../../infrastructure/product/repository/sequelize/product.model'
import ProductRepository from '../../../infrastructure/product/repository/sequelize/product.repository'
import CreateProductUseCase from './create.product.usecase'

describe('Integration test for create product use case', () => {
  let sequelize: Sequelize

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    })

    await sequelize.addModels([ProductModel])
    await sequelize.sync()
  })

  afterEach(async () => {
    await sequelize.close()
  })

  it('should create a product', async () => {
    const productRepository = new ProductRepository()
    const usecase = new CreateProductUseCase(productRepository)
    const input = {
      name: 'Product 1',
      price: 10,
    }
    const output = {
      id: expect.any(String),
      name: 'Product 1',
      price: 10,
    }
    const result = await usecase.execute(input)
    expect(result).toEqual(output)
  })

  it('should throw an error when name is missing', async () => {
    const productRepository = new ProductRepository()
    const usecase = new CreateProductUseCase(productRepository)
    const input = {
      name: '',
      price: 10,
    }
    await expect(usecase.execute(input)).rejects.toThrowError(
      'Name is required',
    )
  })

  it('should throw an error when price is less than zero', async () => {
    const productRepository = new ProductRepository()
    const usecase = new CreateProductUseCase(productRepository)
    const input = {
      name: 'Product 1',
      price: -10,
    }
    await expect(usecase.execute(input)).rejects.toThrowError(
      'Price must be greater than zero',
    )
  })

  it('should throw an error when price is zero', async () => {
    const productRepository = new ProductRepository()
    const usecase = new CreateProductUseCase(productRepository)
    const input = {
      name: 'Product 1',
      price: 0,
    }
    await expect(usecase.execute(input)).rejects.toThrowError(
      'Price must be greater than zero',
    )
  })
})
