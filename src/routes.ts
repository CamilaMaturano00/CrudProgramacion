import { Router } from "express";
import {UserControllers} from "./controllers/UserControllers";
import ProductControllers from "./controllers/ProductControllers";
import CategoryControllers from "./controllers/CategoryControllers";
import { LoginControllers } from "./controllers/LoginControllers";

//-------------------------------------------------------------------------
const router = Router();
const controllers = new UserControllers();

router.get("/Usuarios",controllers.handleListUser);
router.get("/add", (request, response) => {
  response.render("add");
});
router.get("/index", (request, response) => {
  response.render("index");
});
router.post("/add-user", controllers.handleCreateUser);
router.get("/search", controllers.handleSearchUser);
router.get("/edit", controllers.handleGetUser);
router.post("/edit-user", controllers.handleUpdateUser);
router.post("/delete-user", controllers.handleDeleteUser);
//-------------------------------------------------------------------------
const product = new ProductControllers();

router.get("/product", product.handleListProduct);
router.get("/addProduct", product.handleAddProduct);
router.post("/addProduct", product.handleCreateProduct);
router.get("/searchProduct", product.handleSearchProduct);
router.get("/editProduct", product.handleGetProduct);
router.post("/edit-product", product.handleUpdateProduct);
router.post("/delete-product", product.handleDeleteProduct);
//-------------------------------------------------------------------------
const category = new CategoryControllers();
router.get("/Category", category.handleListCategory);
router.get("/addCategory", (request, response) => {
  response.render("addCategory");});
router.post("/addCategory", category.handleCreateCategory);
router.get("/searchCategory", category.handleSearchCategory);
router.get("/editCategory", category.handleGetCategory);
router.post("/edit-category", category.handleUpdateCategory);
router.post("/delete-category", category.handleDeleteCategory);
//-------------------------------------------------------------------------

const login = new LoginControllers();

router.get("/signUp", (request, response) => {
  response.render("signUp");
});
router.get("/signIn", (request, response) => {
  response.render("signIn");
});
router.post("/signUp",login.handleCreateSingUp);
router.post("/signIn", login.signInAutentication);
router.get("/ListLogin",login.handleListUser);
router.get("/search", login.handleSearchUser);
router.get("/editLogin", login.handleGetUser);
router.post("/edit-Login", login.handleUpdateUser);
router.post("/deleteLogin", login.handleDeleteUser);

export { router };
