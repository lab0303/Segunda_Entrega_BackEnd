const chai = require("chai");
const supertest = require("supertest");

const expect = chai.expect;

const requester = supertest("http://localhost:8080");

describe("Testing ecommerce", () => {
  describe("Testing products", () => {
    const productInfo = {
      name: "Laptop Asus",
      price: 700,
      category: "Electronics",
      stock: 6,
    };
    it("El endpoint POST /api/products debe crear un producto correctamente", async () => {
      const { _body } = await requester.post("/api/products").send(productInfo);

      expect(_body.message.name).to.exist;
    });

    it("Si se crea un producto sin algun campo, deberia responder con un status: Error ", async () => {
      const product = {
        name: "TV",
      };
      const { _body } = await requester.post("/api/products").send(product);
      expect(_body.status).to.equal("Error");
    });

    it("Al obtener GET /api/products, debe traer los productos en array", async () => {
      const { _body } = await requester.get("/api/products");
      expect(_body.message.docs).to.be.an("array");
    });
  });
  describe("Testing carts", () => {
    const productInfo = {
      name: "Laptop Asus",
      price: 700,
      category: "Electronics",
      stock: 6,
    };
    it("El endpoint POST /api/carts debe crear un producto correctamente", async () => {
      const { _body } = await requester.post("/api/carts").send();

      expect(_body.cart).to.have.property("_id");
    });

    it("Al obtener GET /api/carts, debe traer los productos en array", async () => {
      const { _body } = await requester.get("/api/carts");
      expect(_body.carts).to.be.an("array");
    });

    it("Al obtener GET /api/cart/:id, debe traer el producto con ese id", async () => {
      const id = "643b438c812ad05e9a5ae946";
      const { _body } = await requester.get(`/api/carts/${id}`);
      expect(_body.cart).to.have.property("_id");
    });
  });
});
