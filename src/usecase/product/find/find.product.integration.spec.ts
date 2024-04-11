import { Sequelize } from 'sequelize-typescript'
import Product from '../../../domain/product/entity/product'
import ProductRepository from '../../../infrastructure/product/repository/sequelize/product.repository'
import FindProductUseCase from './find.product.usecase'
import ProductModel from '../../../infrastructure/product/repository/sequelize/product.model'

describe('Integration test for find product use case', () => {
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

  it('should find a product', async () => {
    const productRepository = new ProductRepository()
    const usecase = new FindProductUseCase(productRepository)
    const product = new Product('123', 'Product 1', 10)
    await productRepository.create(product)
    const input = {
      id: '123',
    }
    const output = {
      id: '123',
      name: 'Product 1',
      price: 10,
    }
    const result = await usecase.execute(input)
    expect(result).toEqual(output)
  })

  it('should not find a product', async () => {
    const productRepository = new ProductRepository()
    const usecase = new FindProductUseCase(productRepository)
    const input = {
      id: '124',
    }
    expect(usecase.execute(input)).rejects.toThrow('Product not found')
  })
})
