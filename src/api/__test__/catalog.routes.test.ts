import express from "express";
import catalogRoutes, { catalogService } from "../catalog.routes";
import { faker } from "@faker-js/faker";
import request from "supertest";
import { Product } from "../../models/product.model";
import { MockProduct, ProductFactory } from "../../utils/fixture";

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

    test("should return internal server error with status code 500 ", async () => {
      const requestBody = MockProduct();
      jest
        .spyOn(catalogService, "createProduct")
        .mockImplementationOnce(() =>
          Promise.reject(new Error("internal server error"))
        );

      const response = await request(app)
        .post("/product")
        .send(requestBody)
        .set("Accept", "application/json");

      expect(response.status).toBe(500);
      expect(response.body).toEqual("internal server error");
    });
  });
});
