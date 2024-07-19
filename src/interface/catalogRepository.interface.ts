import { Product } from "../models/product.model";

interface ICatalogRepository {
  create(data: Product): Promise<Product>;
  update(data: Product): Promise<Product>;
  delete(id: number): Promise<{}>;
  find(): Promise<Product[]>;
  findOne(id: number): Promise<Product[]>;
}

export { ICatalogRepository };
