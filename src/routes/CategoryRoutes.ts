import { Router } from "express";
import CategoryControllers from "../controllers/CategoryControllers";

const routerCategory = Router();
const category = new CategoryControllers();
routerCategory.get("/", category.handleListCategory);
routerCategory.get("/addCategory", (request, response) => {
  response.render("addCategory");});

routerCategory.post("/addCategory", category.handleCreateCategory);

routerCategory.get("/searchCategory", category.handleSearchCategory);

routerCategory.get("/editCategory", category.handleGetCategory);

routerCategory.post("/edit-category", category.handleUpdateCategory);

routerCategory.post("/delete-category", category.handleDeleteCategory);

routerCategory.get("/login2", (request, response) => {
  response.render("login2");
});
export { routerCategory };
