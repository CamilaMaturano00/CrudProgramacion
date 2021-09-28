import { Router } from "express";
import {UserControllers} from "./controllers/UserControllers";
import ProductControllers from "./controllers/ProductControllers";

const router = Router();

const controllers = new UserControllers();

router.get("/index",controllers.handleListUser);

router.get("/add", (request, response) => {
  response.render("add");
});
router.get("/", (request, response) => {
  response.render("login");
});
/*router.get("/index", (request, response) => {
  response.render("index");
});*/
router.post("/add-user", controllers.handleCreateUser);

router.get("/search", controllers.handleSearchUser);

router.get("/edit", controllers.handleGetUser);

router.post("/edit-user", controllers.handleUpdateUser);

router.post("/delete-user", controllers.handleDeleteUser);

const product = new ProductControllers();

router.get("/product", product.handleListProduct);

router.get("/addProduct", (request, response) => {
  response.render("addProduct");
});
router.post("/addProduct", product.handleCreateProduct);

router.get("/search", product.handleSearchProduct);

router.get("/editProduct", product.handleGetProduct);

router.post("/edit-product", product.handleUpdateProduct);

router.post("/delete-product", product.handleDeleteProduct);
export { router };
