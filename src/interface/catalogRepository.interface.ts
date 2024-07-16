import { Product } from "../models/product.model";

interface ICatalogRepository {
  create(data: Product): Promise<{}>;
  update(data: Product): Promise<{}>;
  delete(id: number): Promise<{}>;
  find(): Promise<[]>;
  findOne(id: number): Promise<[]>;
}

export { ICatalogRepository };
