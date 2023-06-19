const generateProductErrorInfo = (product) => {
  return `one or more properties were incomplete or not valid.
    List of requiere properties:
    * name: needs to be a String, received ${product.name}
    * price: needs to be a Number, received ${product.price}
    * category: needs to be a String, received ${product.category}
    * stock: needs to be a Number, received ${product.stock}
    `;
};

module.exports = generateProductErrorInfo;
