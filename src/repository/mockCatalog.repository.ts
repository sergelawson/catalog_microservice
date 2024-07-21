import { ICatalogRepository } from "../interface/catalogRepository.interface";
import { Product } from "../models/product.model";

class MockCatalogRepository implements ICatalogRepository {
  create(data: Product): Promise<Product> {
    const mockProduct: Product = {
      id: 123,
      name: data.name,
      price: data.price,
      description: data.description,
      stock: data.stock,
    };
    return Promise.resolve(mockProduct);
  }
  update(data: Product): Promise<Product> {
    const mockProduct: Product = {
      id: data.id,
      name: data.name,
      price: data.price,
      description: data.description,
      stock: data.stock,
    };
    return Promise.resolve(mockProduct);
  }
  delete(id: number): Promise<number> {
    return Promise.resolve(id);
  }
  find(limit: number, offset: number): Promise<Product[]> {
    return Promise.resolve([]);
  }
  findOne(id: number): Promise<Product> {
    return Promise.resolve({} as Product);
  }
}

export { MockCatalogRepository };
