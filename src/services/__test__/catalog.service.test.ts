import { ICatalogRepository } from "../../interface/catalogRepository.interface";
import { Product } from "../../models/product.model";
import { MockCatalogRepository } from "../../repository/mockCatalog.repository";
import { CatalogService } from "../catalog.service";
import { faker } from "@faker-js/faker";

const mockProduct = (rest?: Object) => {
  return {
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: Number(faker.commerce.price()),
    stock: faker.number.int({ min: 10, max: 100 }),
    ...rest,
  };
};

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

      const requestBody = mockProduct();

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

      const requestBody = mockProduct();

      jest
        .spyOn(repository, "create")
        .mockImplementationOnce(() => Promise.resolve({} as Product));

      const result = service.createProduct(requestBody);

      await expect(result).rejects.toThrow("unable to create product");
    });

    test("should throw product already exist error", async () => {
      const service = new CatalogService(repository);

      const requestBody = mockProduct();

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
      const requestBody = mockProduct({
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
});
