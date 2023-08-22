const Products = require("./models/Products.model");

class ProductsMongoDAO {
  constructor() {}

  async getProducts(query, limit, page, sort) {
    return await Products.paginate(query, {
      limit,
      page,
      sort,
    });
  }
  async getProduct(pid) {
    return await Products.findOne({ _id: pid });
  }
  async addProduct(newProduct) {
    await Products.create(newProduct);
  }

  async deleteProduct(pid) {
    await Products.deleteOne({ _id: pid });
  }
}

module.exports = ProductsMongoDAO;
