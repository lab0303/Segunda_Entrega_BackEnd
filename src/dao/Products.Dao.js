const Products = require("./models/Products.model");

class ProductsDAO {
  constructor() {}
  async getProduct(pid) {
    return await Products.findOne({ _id: pid });
  }
  async addProduct(newProduct) {
    Products.create(newProduct);
  }

  async deleteProduct(pid) {
    return await Products.deleteOne({ _id: pid });
  }
}

module.exports = ProductsDAO;
