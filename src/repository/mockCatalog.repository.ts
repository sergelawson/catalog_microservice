import { ICatalogRepository } from "../interface/catalogRepository.interface";
import { Product } from "../models/product.model";

class MockCatalogRepository implements ICatalogRepository {
  create(data: Product): Promise<{}> {
    throw new Error("Method not implemented.");
  }
  update(data: Product): Promise<{}> {
    throw new Error("Method not implemented.");
  }
  delete(id: number): Promise<{}> {
    throw new Error("Method not implemented.");
  }
  find(): Promise<[]> {
    throw new Error("Method not implemented.");
  }
  findOne(id: number): Promise<[]> {
    throw new Error("Method not implemented.");
  }
}

export { MockCatalogRepository };
