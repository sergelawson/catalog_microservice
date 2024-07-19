import { ICatalogRepository } from "../interface/catalogRepository.interface";

class CatalogService {
  private _repository: ICatalogRepository;

  constructor(repository: ICatalogRepository) {
    this._repository = repository;
  }

  async createProduct(input: any) {
    const data = await this._repository.create(input);
    if (!data.id) {
      throw new Error("unable to create product");
    }
    return data;
  }

  async updateProduct(input: any) {
    const data = await this._repository.update(input);

    // Emit event to update elastic search
    return data;
  }

  async getProducts(limit: number, offset: number) {}

  async getProduct(id: number) {}

  async deleteProduct(id: number) {}
}

export { CatalogService };
