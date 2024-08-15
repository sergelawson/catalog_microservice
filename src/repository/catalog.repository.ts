import { ICatalogRepository } from "../interface/catalogRepository.interface";
import { Product } from "../models/product.model";

class CatalogRepository implements ICatalogRepository {
  create(data: Product): Promise<Product> {
    throw new Error("Method not implemented.");
  }
  update(data: Product): Promise<Product> {
    throw new Error("Method not implemented.");
  }
  delete(id: number): Promise<number> {
    throw new Error("Method not implemented.");
  }
  find(): Promise<Product[]> {
    throw new Error("Method not implemented.");
  }
  findOne(id: number): Promise<Product | null> {
    throw new Error("Method not implemented.");
  }
}

export { CatalogRepository };
