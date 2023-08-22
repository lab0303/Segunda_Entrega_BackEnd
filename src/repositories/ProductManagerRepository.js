class ProductManagerRepository {
  constructor(productManager) {
    this.productManager = productManager;
  }

  async getAllProducts(query, limit, page, sort) {
    return await this.productManager.getProducts(query, limit, page, sort);
  }

  async getProductById(pid) {
    return await this.productManager.getProduct(pid);
  }

  async addProduct(product) {
    return await this.productManager.addProduct(product);
  }

  async deleteProduct(pid) {
    return await this.productManager.deleteProduct(pid);
  }
}

module.exports = ProductManagerRepository;
