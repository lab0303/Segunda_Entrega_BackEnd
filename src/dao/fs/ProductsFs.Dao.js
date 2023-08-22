const fs = require("fs");

class ProductsFsDAO {
  constructor(path) {
    this.path = path;
  }

  async getProducts() {
    try {
      const data = await fs.promises.readFile(this.path, "utf-8");
      const response = JSON.parse(data);
      return response;
    } catch (error) {
      throw "Error al leer el archivo";
    }
  }
  async getProduct(pid) {
    const products = await this.getProducts();
    const response = products.filter((product) => product._id === pid);
    return response;
  }
  async addProduct(newProduct) {
    const products = await this.getProducts();
    products.push(newProduct);
    await this.writeFile(products);
  }

  async deleteProduct(pid) {
    const products = await this.getProducts();
    udpateProduct = products.filter((product) => product._id !== pid);
    await this.writeFile(udpateProduct);
  }

  async writeFile(data) {
    try {
      await fs.promises.writeFile(this.path, JSON.stringify(data, null, 2));
    } catch (error) {
      throw "Error al escribir la data";
    }
  }
}

module.exports = ProductsFsDAO;
