import ProductRepositoryInterface from '../../../domain/product/repository/product-repository.interface'
import { InputUpdateProductDto } from './update.product.dto'

export default class UpdateProductUseCase {
  private productRepository: ProductRepositoryInterface
  constructor(productRepository: ProductRepositoryInterface) {
    this.productRepository = productRepository
  }
  async execute(input: InputUpdateProductDto): Promise<void> {
    const product = await this.productRepository.find(input.id)
    product.changeName(input.name)
    product.changePrice(input.price)
    await this.productRepository.update(product)
  }
}
