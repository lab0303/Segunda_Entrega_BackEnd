const ProductsMongoDAO = require("../dao/ProductsMongo.Dao");
const ProductsFsDAO = require("../dao/fs/ProductsFs.Dao");
const ProductManagerRepository = require("./ProductManagerRepository");

const ProductManager = new ProductManagerRepository(new ProductsMongoDAO());

module.exports = ProductManager;
