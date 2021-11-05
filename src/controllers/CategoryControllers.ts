import { Request, Response } from "express";
import {CategoryService} from "../services/CategoryService";
class CategoryControllers{
  
    async handleCreateCategory(request: Request, response: Response) {
        const { id,categoryname} = request.body;
        const service = new CategoryService();
        try {
          await service.create({
            id,
            categoryname,
          }).then(() => {
            response.render("messageCategory", {
              message: "Categoria registrada exitosamente"
            });
          });
        } catch (err) {
          response.render("messageCategory", {
            message: `Error al registrar categoria: ${err.message}`
          });
        }
    
      }
      async handleDeleteCategory(request: Request, response: Response) {
      const { id } = request.body;
  
      const deleteCategoryService = new CategoryService();
  
      try {
        await deleteCategoryService.delete(id).then(() => {
          response.render("messageCategory", {
            message: "Categoria eliminada correctamente"
          });
        });
      } catch (err) {
        response.render("messageCategory", {
          message: `Error al eliminar categoria: ${err.message}`
        });
      }
    } 
    async handleGetCategory(request: Request, response: Response) {
      let { id } = request.query;
      id = id.toString();
  
      const getCategoryDataService = new CategoryService();
  
      const category = await getCategoryDataService.getData(id);
  
      return response.render("editCategory", {
        category: category
      }); 
    } 
    async handleListCategory(request: Request, response: Response) {
      const listCategoryService = new CategoryService();
  
      const category = await listCategoryService.list();
  
      return response.render("Category", {
        category: category
      });
    }
    async handleSearchCategory(request: Request, response: Response) {
      let { search } = request.query;
      search = search.toString();
  
      const searchCategoryService = new CategoryService();
  
      try {
        const category = await searchCategoryService.search(search);
        response.render("searchCategory", {
          category: category,
          search: search
        });
      } catch (err) {
        response.render("messageCategory", {
          message: `Error al buscar category: ${err.message}`
        });
      }
    }
    async handleUpdateCategory(request: Request, response: Response) {
      const { id, categoryname} = request.body;
  
      const updateCategoryService = new CategoryService();
  
      try {
        await updateCategoryService.update({ id, categoryname}).then(() => {
          response.render("messageCategory", {
            message: "Categoria actualizada correctamente"
          });
        });
      } catch (err) {
        response.render("messageCategory", {
          message: `Error al actualizar categoria: ${err.message}`
        });
      }
  
    }
  }
  export default CategoryControllers;