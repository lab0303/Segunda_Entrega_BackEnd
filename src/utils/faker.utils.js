const { faker } = require("@faker-js/faker");

const generateProducts = () => {
  const products = [];
  for (let i = 0; i < 100; i++) {
    const product = {
      _id: faker.database.mongodbObjectId(),
      name: faker.commerce.productName(),
      price: faker.commerce.price(),
      category: faker.commerce.product(),
      stock: faker.string.numeric({ length: 2, exclude: ["0"] }),
    };
    products.push(product);
  }
  return products;
};

module.exports = generateProducts;
