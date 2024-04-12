import Product from './product'

describe('Product unit tests', () => {
  it('should throw error when id is empty', () => {
    expect(() => {
      new Product('', 'Product 1', 100)
    }).toThrow('product: Id is required')
  })

  it('should throw error when name is empty', () => {
    expect(() => {
      new Product('123', '', 100)
    }).toThrow('product: Name is required')
  })

  it('should throw error when price is not greater than zero', () => {
    expect(() => {
      new Product('123', 'Product 1', 0)
    }).toThrow('product: Price must be greater than zero')
  })

  it('should throw error when id and name are empty', () => {
    expect(() => {
      new Product('', '', 100)
    }).toThrow('product: Id is required,product: Name is required')
  })

  it('should throw error when id is empty and price is not greater than zero', () => {
    expect(() => {
      new Product('', 'Product 1', 0)
    }).toThrow(
      'product: Id is required,product: Price must be greater than zero',
    )
  })

  it('should throw error when name is empty and price is not greater than zero', () => {
    expect(() => {
      new Product('123', '', 0)
    }).toThrow(
      'product: Name is required,product: Price must be greater than zero',
    )
  })

  it('should throw error when id and name are empty and price is not greater than zero', () => {
    expect(() => {
      new Product('', '', 0)
    }).toThrow(
      'product: Id is required,product: Name is required,product: Price must be greater than zero',
    )
  })

  it('should change name', () => {
    const product = new Product('123', 'Product 1', 100)
    product.changeName('Product 2')
    expect(product.name).toBe('Product 2')
  })

  it('should change price', () => {
    const product = new Product('123', 'Product 1', 100)
    product.changePrice(150)
    expect(product.price).toBe(150)
  })
})
