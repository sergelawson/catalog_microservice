import { Product } from "../models/product.model";

interface ICatalogRepository {
  create(data: Product): Promise<Product>;
  update(data: Product): Promise<Product>;
  delete(id: number): Promise<number>;
  find(limit: number, offset: number): Promise<Product[]>;
  findOne(id: number): Promise<Product | null>;
}

export { ICatalogRepository };
