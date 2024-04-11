import CreateProductUseCase from './create.product.usecase'

const MockRepository = () => {
  return {
    create: jest.fn(),
    update: jest.fn(),
    find: jest.fn(),
    findAll: jest.fn(),
  }
}

describe('Unit test create product use case', () => {
  it('should create a product', async () => {
    const productRepository = MockRepository()
    const createProductUseCase = new CreateProductUseCase(productRepository)
    const input = {
      name: 'Product 1',
      price: 10,
    }
    const output = await createProductUseCase.execute(input)

    expect(output).toEqual({
      id: expect.any(String),
      name: 'Product 1',
      price: 10,
    })
  })

  it('should throw an error when name is missing', async () => {
    const productRepository = MockRepository()
    const createProductUseCase = new CreateProductUseCase(productRepository)
    const input = {
      name: '',
      price: 10,
    }
    await expect(createProductUseCase.execute(input)).rejects.toThrow(
      'Name is required',
    )
  })

  it('should throw an error when price is less than zero', async () => {
    const productRepository = MockRepository()
    const createProductUseCase = new CreateProductUseCase(productRepository)
    const input = {
      name: 'Product 1',
      price: -1,
    }
    await expect(createProductUseCase.execute(input)).rejects.toThrow(
      'Price must be greater than zero',
    )
  })

  it('should throw an error when price is zero', async () => {
    const productRepository = MockRepository()
    const createProductUseCase = new CreateProductUseCase(productRepository)
    const input = {
      name: 'Product 1',
      price: 0,
    }
    await expect(createProductUseCase.execute(input)).rejects.toThrow(
      'Price must be greater than zero',
    )
  })
})
