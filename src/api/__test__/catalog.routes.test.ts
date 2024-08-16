import express from "express";
import catalogRoutes, { catalogService } from "../catalog.routes";
import request from "supertest";
import { Product } from "../../models/product.model";
import { MockProduct, ProductFactory } from "../../utils/fixture";
import { faker } from "@faker-js/faker";

const app = express();

app.use(express.json());

app.use(catalogRoutes);

describe("Catalog Routes", () => {
  describe("POST /product", () => {
    test("should succefully create product", async () => {
      const requestBody = MockProduct();
      const product = ProductFactory.build();
      jest
        .spyOn(catalogService, "createProduct")
        .mockImplementationOnce(() => Promise.resolve(product as Product));
      const response = await request(app)
        .post("/product")
        .send(requestBody)
        .set("Accept", "application/json");

      expect(response.status).toBe(201);
      expect(response.body).toEqual(product);
    });

    test("should return emtpy name error", async () => {
      const requestBody = MockProduct();

      const response = await request(app)
        .post("/product")
        .send({ ...requestBody, name: "" })
        .set("Accept", "application/json");

      expect(response.status).toBe(400);
      expect(response.body).toEqual("name should not be empty");
    });

    test("should return unable to create product with status code 500 ", async () => {
      const requestBody = MockProduct();
      jest
        .spyOn(catalogService, "createProduct")
        .mockImplementationOnce(() =>
          Promise.reject(new Error("unable to create product"))
        );

      const response = await request(app)
        .post("/product")
        .send(requestBody)
        .set("Accept", "application/json");

      expect(response.status).toBe(500);
      expect(response.body).toEqual("unable to create product");
    });
  });

  describe("PATCH /products/:id", () => {
    test("should succefully update product", async () => {
      const product = ProductFactory.build();
      const requestBody = {
        name: product.name,
        price: product.price,
        description: product.description,
        stock: product.stock,
      };

      jest
        .spyOn(catalogService, "updateProduct")
        .mockImplementationOnce(() => Promise.resolve(product as Product));
      const response = await request(app)
        .patch(`/products/${product.id}`)
        .send(requestBody)
        .set("Accept", "application/json");

      expect(response.status).toBe(200);
      expect(response.body).toEqual(product);
    });

    test("should return error 400", async () => {
      const product = ProductFactory.build();
      const requestBody = {
        name: product.name,
        price: -1,
        description: product.description,
        stock: product.stock,
      };

      const response = await request(app)
        .patch(`/products/${product.id}`)
        .send(requestBody)
        .set("Accept", "application/json");

      expect(response.status).toBe(400);
      expect(response.body).toEqual("price must not be less than 1");
    });

    test("should return unable to update product with status code 500", async () => {
      const product = ProductFactory.build();
      const requestBody = {
        name: product.name,
        price: product.price,
        description: product.description,
        stock: product.stock,
      };

      jest
        .spyOn(catalogService, "updateProduct")
        .mockImplementationOnce(() =>
          Promise.reject(new Error("unable to update product"))
        );
      const response = await request(app)
        .patch(`/products/${product.id}`)
        .send(requestBody)
        .set("Accept", "application/json");

      expect(response.status).toBe(500);
      expect(response.body).toContain("unable to update product");
    });
  });

  describe("GET /products/:id", () => {
    test("should return product by id", async () => {
      const product = ProductFactory.build();

      jest
        .spyOn(catalogService, "getProduct")
        .mockImplementationOnce(() => Promise.resolve(product as Product));
      const response = await request(app)
        .get(`/products/${product.id}`)
        .set("Accept", "application/json");

      expect(response.status).toBe(200);
      expect(response.body).toEqual(product);
    });

    test("should return product not found with status code 404", async () => {
      const product = ProductFactory.build();

      jest
        .spyOn(catalogService, "getProduct")
        .mockImplementationOnce(() => Promise.resolve(null));
      const response = await request(app)
        .get(`/products/${product.id}`)
        .set("Accept", "application/json");

      expect(response.status).toBe(404);
    });
  });

  describe("GET /products", () => {
    test("should return product by id", async () => {
      const limit = faker.number.int({ min: 2, max: 10 });
      const product = ProductFactory.buildList(limit);

      jest
        .spyOn(catalogService, "getProducts")
        .mockImplementationOnce(() => Promise.resolve(product as Product[]));
      const response = await request(app)
        .get(`/products?limit=${limit}&offset=0`)
        .set("Accept", "application/json");

      expect(response.status).toBe(200);
      expect(response.body).toEqual(product);
    });
  });

  describe("DELETE /products/id", () => {
    test("should delete and return product id", async () => {
      const product = ProductFactory.build();

      jest
        .spyOn(catalogService, "deleteProduct")
        .mockImplementationOnce(() => Promise.resolve(Number(product.id)));
      const response = await request(app)
        .delete(`/products/${product.id}`)
        .set("Accept", "application/json");

      expect(response.status).toBe(200);
      expect(response.body).toEqual(product.id);
    });
  });
});
