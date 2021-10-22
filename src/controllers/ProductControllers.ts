import { Request, Response } from "express";
import {ProductsService} from "../services/ProductService";

class ProductControllers{
  
  async handleCreateProduct(request: Request, response: Response) {
      const { id,productname, price, type, category} = request.body;
      const service = new ProductsService();
      try {
        await service.create({
          id,
          productname,
          price,
          type,
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

    return response.render("editProduct", {
      product: product
    }); 
  } 
  async handleListProduct(request: Request, response: Response) {
    const listProductsService = new ProductsService();

    const products = await listProductsService.list();

    return response.render("Product", {
      products: products
    });
  }
  async handleSearchProduct(request: Request, response: Response) {
    let { search } = request.query;
    search = search.toString();

    const searchProductService = new ProductsService();

    try {
      const products = await searchProductService.search(search);
      response.render("search", {
        products: products,
        search: search
      });
    } catch (err) {
      response.render("message", {
        message: `Error al buscar producto: ${err.message}`
      });
    }
  }
  async handleUpdateProduct(request: Request, response: Response) {
    const { id, productname, price, type, category} = request.body;

    const updateProductService = new ProductsService();

    try {
      await updateProductService.update({ id, productname, price, type, category}).then(() => {
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