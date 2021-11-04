import { Request, Response } from "express";
import { Category } from "../entities/Category";
import { CategoryService } from "../services/CategoryService";
import {ProductsService} from "../services/ProductService";

class ProductControllers{

  
  async handleAddProduct(reqeust: Request, response: Response) {
    const service = new CategoryService();
    const categories = await service.list();
    response.render("addProduct", {categories})
  }
  async handleCreateProduct(request: Request, response: Response) {
      const { id,productname, price, category} = request.body;
      const service = new ProductsService();
      try {
        await service.create({
          id,
          productname,
          price,
          category
        }).then(() => {
          response.render("message", {
            message: "Producto registrado exitosamente"
          });
        });
      } catch (err) {
        response.render("message", {
          message: `Error al registrar producto: ${err.message}`
        });
      }
  
    }
    async handleDeleteProduct(request: Request, response: Response) {
    const { id } = request.body;

    const deleteProductService = new ProductsService();

    try {
      await deleteProductService.delete(id).then(() => {
        response.render("message", {
          message: "Producto eliminado correctamente"
        });
      });
    } catch (err) {
      response.render("message", {
        message: `Error al eliminar producto: ${err.message}`
      });
    }
  } 
  async handleGetProduct(request: Request, response: Response) {
    let { id } = request.query;
    id = id.toString();

    const getProductDataService = new ProductsService();

    const product = await getProductDataService.getData(id);

    const listarcategoria = new CategoryService();
  
    const categorias = await listarcategoria.list()
    return response.render("editProduct", {
      product: product,
      categories: categorias
    });
  } 
  async handleListProduct(request: Request, response: Response) {
    const listProductsService = new ProductsService();
    const products = await listProductsService.list();
    const listarcategoria = new CategoryService();
  
    const categorias = await listarcategoria.list()
    return response.render("Product", {
      products: products,
      categories: categorias
    });
  }
  async handleSearchProduct(request: Request, response: Response) {
    let { search } = request.query;
    search = search.toString();

    const searchProductService = new ProductsService();
    const listarcategoria = new CategoryService();
  
    const categorias = await listarcategoria.search(search)
    try {
      const products = await searchProductService.search(search);
      response.render("searchProduct", {
        products: products,
        categories: categorias,
        search: search
      });
    } catch (err) {
      response.render("message", {
        message: `Error al buscar producto: ${err.message}`
      });
    }
  }
  async handleUpdateProduct(request: Request, response: Response) {
    
    const { id, productname, price, category} = request.body;

    const updateProductService = new ProductsService();

    try {
      await updateProductService.update({ id, productname, price, category}).then(() => {
        response.render("message", {
          message: "Producto actualizado correctamente"
        });
      });
    } catch (err) {
      response.render("message", {
        message: `Error al actualizar producto: ${err.message}`
      });
    }

  }
}
export default ProductControllers;