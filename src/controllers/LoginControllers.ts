import { Request, Response } from "express";
import {LoginService} from "../services/LoginService";

class LoginControllers{

  async handleCreateLogin(request: Request, response: Response) {
      const { username, password } = request.body;
      const createUserService = new LoginService();
  
      try {
        await createUserService.create({
          username,
          password
        }).then(() => {
          response.render("message", {
            message: "Usuario registrado exitosamente"
          });
        });
      } catch (err) {
        response.render("message", {
          message: `Error al registrar usuario: ${err.message}`
        });
      }
  }
  async handleDeleteUser(request: Request, response: Response) {
    const { id } = request.body;

    const deleteUserService = new LoginService();

    try {
        await deleteUserService.delete(id).then(() => {
        response.render("message", {
          message: "Usuario eliminado correctamente"
        });
      });
    } catch (err) {
      response.render("message", {
        message: `Error al eliminar usuario: ${err.message}`
      });
    }
  } 
  async handleGetUser(request: Request, response: Response) {
    let { id } = request.query;
    id = id.toString();

    const getUserDataService = new LoginService();            
    const login = await getUserDataService.getData(id);

    return response.render("editLogin", {
      login: login
    }); 
  } 
  async handleListUser(request: Request, response: Response) {
    const listUsersService = new LoginService();
    const login = await listUsersService.list();

    return response.render("ListLogin", {
      login: login
    });
  }
  async handleSearchUser(request: Request, response: Response) {
    let { search } = request.query;
    search = search.toString();
    const searchUserService = new LoginService();

    try {
      const users = await searchUserService.search(search);
      response.render("searchLogin", {
        users: users,
        search: search
      });
    } catch (err) {
      response.render("message", {
        message: `Error al buscar usuario: ${err.message}`
      });
    }
  }
  async handleUpdateUser(request: Request, response: Response) {
    const { id, username, password } = request.body;
    const updateUserService = new LoginService();

    try {
      await updateUserService.update({ id, username, password }).then(() => {
        response.render("message", {
          message: "Usuario actualizado correctamente"
        });
      });
    } catch (err) {
      response.render("message", {
        message: `Error al actualizar usuario: ${err.message}`
      });
    }

  }
  async loginAutentication(request: Request, response: Response){
    const {username, password} = request.body;
    const loginAutenticationService = new LoginService();

    try {
      await loginAutenticationService.autentication({ username, password}).then(() => {
        response.render("message", {
          message: "Sesion iniciada exitosamente"
        });
      });
    } catch (err) {
      response.render("messageLogin", {
        message: `Error al iniciar usuario: ${err.message}`
      });
    }
  }

}
/*class LoginControllers{
  async renderSignupForm(request: Request, response: Response){
    response.render('registro');
  }
  async signup(request: Request, response: Response){
    response.render('index');
  }
  async renderSigninForm(request: Request, response: Response){
    response.render('login');
  }
  async signin(request: Request, response: Response){
    response.render('index');
  }
  async logout(request: Request, response: Response){
    response.render('logout');
  }
}*/
export {LoginControllers};