import Product from '../../../domain/product/entity/product'
import UpdateProductUseCase from './update.product.usecase'

let product = new Product('123', 'Product 1 Updated', 20)

const MockRepository = () => {
  return {
    create: jest.fn(),
    update: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(product)),
    findAll: jest.fn(),
  }
}

describe('Unit test update product use case', () => {
  beforeEach(() => {
    product = new Product('123', 'Product 1 Updated', 20)
  })
  it('should update a product', async () => {
    const productRepository = MockRepository()
    const updateProductUseCase = new UpdateProductUseCase(productRepository)
    const input = {
      id: product.id,
      name: 'Product 1 Updated',
      price: 20,
    }
    await updateProductUseCase.execute(input)
    const updatedProduct = await productRepository.find(input.id)
    expect(updatedProduct.id).toBe(input.id)
    expect(updatedProduct.name).toBe(input.name)
    expect(updatedProduct.price).toBe(input.price)
  })

  it('should throw an error when name is missing', async () => {
    const productRepository = MockRepository()
    const updateProductUseCase = new UpdateProductUseCase(productRepository)
    const input = {
      id: product.id,
      name: '',
      price: 20,
    }
    await expect(updateProductUseCase.execute(input)).rejects.toThrow(
      'product: Name is required',
    )
  })

  it('should throw an error when price is less than zero', async () => {
    const productRepository = MockRepository()
    const updateProductUseCase = new UpdateProductUseCase(productRepository)
    const input = {
      id: product.id,
      name: 'Product 1 Updated',
      price: -1,
    }
    console.log(product)
    await expect(updateProductUseCase.execute(input)).rejects.toThrow(
      'product: Price must be greater than zero',
    )
  })

  it('should throw an error when product not found', async () => {
    const productRepository = MockRepository()
    productRepository.find.mockImplementation(() => {
      throw new Error('Product not found')
    })
    const updateProductUseCase = new UpdateProductUseCase(productRepository)
    const input = {
      id: '1234',
      name: 'Product 1 Updated',
      price: 20,
    }
    await expect(updateProductUseCase.execute(input)).rejects.toThrow(
      'Product not found',
    )
  })
})
