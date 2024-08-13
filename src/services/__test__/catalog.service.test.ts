import { MockProduct, ProductFactory } from "../../utils/fixture";
import { ICatalogRepository } from "../../interface/catalogRepository.interface";
import { Product } from "../../models/product.model";
import { MockCatalogRepository } from "../../repository/mockCatalog.repository";
import { CatalogService } from "../catalog.service";
import { faker } from "@faker-js/faker";

describe("CatalogService", () => {
  let repository: ICatalogRepository;

  beforeEach(() => {
    repository = new MockCatalogRepository();
  });

  afterEach(() => {
    repository = {} as MockCatalogRepository;
  });

  describe("createProduct", () => {
    test("Should create product", async () => {
      const service = new CatalogService(repository);

      const requestBody = MockProduct();

      const result = await service.createProduct(requestBody);

      expect(result).toMatchObject({
        id: expect.any(Number),
        name: expect.any(String),
        description: expect.any(String),
        price: expect.any(Number),
        stock: expect.any(Number),
      });
    });

    test("should throw unable to create product error", async () => {
      const service = new CatalogService(repository);

      const requestBody = MockProduct();

      jest
        .spyOn(repository, "create")
        .mockImplementationOnce(() => Promise.resolve({} as Product));

      const result = service.createProduct(requestBody);

      await expect(result).rejects.toThrow("unable to create product");
    });

    test("should throw product already exist error", async () => {
      const service = new CatalogService(repository);

      const requestBody = MockProduct();

      jest
        .spyOn(repository, "create")
        .mockImplementationOnce(() =>
          Promise.reject(new Error("product already exists"))
        );

      const result = service.createProduct(requestBody);

      await expect(result).rejects.toThrow("product already exists");
    });
  });

  describe("update product", () => {
    test("should update product", async () => {
      const service = new CatalogService(repository);
      const requestBody = MockProduct({
        id: faker.number.int({ min: 1000, max: 9999 }),
        price: Number(faker.commerce.price),
      });

      const result = await service.updateProduct(requestBody);

      expect(result).toMatchObject(requestBody);
    });

    test("should throw product not found error", async () => {
      const service = new CatalogService(repository);

      jest
        .spyOn(repository, "update")
        .mockImplementationOnce(() =>
          Promise.reject(new Error("product not found"))
        );

      const result = service.updateProduct({});

      await expect(result).rejects.toThrow("product not found");
    });
  });

  describe("get products", () => {
    test("should get products by offset and limit", async () => {
      const service = new CatalogService(repository);

      const randomLimit = faker.number.int({ min: 10, max: 100 });

      const productList = ProductFactory.buildList(randomLimit);

      jest.spyOn(repository, "find").mockImplementationOnce(() => {
        return Promise.resolve(productList);
      });

      const result = await service.getProducts(randomLimit, 0);

      expect(result.length).toEqual(randomLimit);
      expect(result).toMatchObject(productList);
    });

    test("should throw product not found error", async () => {
      const service = new CatalogService(repository);

      jest
        .spyOn(repository, "find")
        .mockImplementationOnce(() =>
          Promise.reject(new Error("product not found"))
        );

      const result = service.getProducts(0, 0);

      await expect(result).rejects.toThrow("product not found");
    });
  });

  describe("get product", () => {
    test("should get products by id", async () => {
      const service = new CatalogService(repository);

      const product = ProductFactory.build();

      jest.spyOn(repository, "findOne").mockImplementationOnce(() => {
        return Promise.resolve(product);
      });

      const result = await service.getProduct(product.id!);

      expect(result).toMatchObject(product);
    });

    test("should throw product not found error", async () => {
      const service = new CatalogService(repository);

      jest
        .spyOn(repository, "findOne")
        .mockImplementationOnce(() =>
          Promise.reject(new Error("product not found"))
        );

      const result = service.getProduct(0);

      await expect(result).rejects.toThrow("product not found");
    });
  });

  describe("delete product", () => {
    test("should get delete by id", async () => {
      const service = new CatalogService(repository);

      const product = ProductFactory.build();

      jest.spyOn(repository, "delete").mockImplementationOnce(() => {
        return Promise.resolve(product.id!);
      });

      const result = await service.deleteProduct(product.id!);

      expect(result).toBe(product.id!);
    });
  });
});
