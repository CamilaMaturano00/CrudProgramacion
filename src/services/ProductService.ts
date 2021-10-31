import { getCustomRepository } from "typeorm";
import { ProductsRepository } from "../repositories/ProductsRepository";
import { Product } from "../entities/Product";
import { Category } from "../entities/Category";

interface IProduct {
    id?: string;
    productname: string;
    price: number;
    category: Category[];
  }
  class ProductsService {
    async create({ id,productname, price, category }: IProduct) {
        if (!id || !productname || !price || !category) {
          throw new Error("Por favor rellenar todos los campos");
        }
    
        const productsRepository = getCustomRepository(ProductsRepository);
    
        const productnameAlreadyExists = await productsRepository.findOne({ id });
    
        if (productnameAlreadyExists) {
          throw new Error("El producto ya esta registrado");
        }
  
        const product = productsRepository.create({ id, productname, price});
    
        await productsRepository.save(product);
    
        return product;
    
      }
      async delete(id: string) {
        const productsRepository = getCustomRepository(ProductsRepository);
    
        const product = await productsRepository
          .createQueryBuilder()
          .delete()
          .from(Product)
          .where("id = :id", { id })
          .execute();
    
        return product;
    
      }
      async getData(id: string) {
        const productsRepository = getCustomRepository(ProductsRepository);
    
        const product = await productsRepository.findOne(id);
    
        return product;
      }
      async list() {
        const productsRepository = getCustomRepository(ProductsRepository);
    
        const product = await productsRepository.find();
    
        return product; 
      }
      async search(search: string) {
        if (!search) {
          throw new Error("Por favor complete el campo de búsquedad");
        }
    
        const productsRepository = getCustomRepository(ProductsRepository);
    
        const product = await productsRepository
          .createQueryBuilder()
          .where("productname like :search", { search: `%${search}%` })
          .orWhere("price like :search", { search: `%${search}%` })
          .orWhere("category like :search", { search: `%${search}%` })
          .getMany();
    
        return product;
    
      }
      async update({ id, productname, price, category }: IProduct) {
        const productsRepository = getCustomRepository(ProductsRepository);
    
        const product = await productsRepository
          .createQueryBuilder()
          .update(Product)
          .set({id, productname, price, category})
          .where("id = :id", { id: String})
          .execute();
    
        return product;
    
      }

}

export {ProductsService };