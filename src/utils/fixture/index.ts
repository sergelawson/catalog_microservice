import { faker } from "@faker-js/faker";
import { Factory } from "rosie";
import { Product } from "../../models/product.model";

export const ProductFactory = new Factory<Product>()
  .attr("id", faker.number.int({ min: 100, max: 1000 }))
  .attr("name", faker.commerce.productName())
  .attr("price", Number(faker.commerce.price()))
  .attr("description", faker.commerce.productDescription())
  .attr("stock", faker.number.int({ min: 1, max: 10 }));

export const MockProduct = (rest?: Object) => {
  return {
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: Number(faker.commerce.price()),
    stock: faker.number.int({ min: 10, max: 100 }),
    ...rest,
  };
};
