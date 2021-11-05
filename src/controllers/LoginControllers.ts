import { Request, Response } from "express";
import {LoginService} from "../services/LoginService";

class LoginControllers{

  async handleCreateSingUp(request: Request, response: Response) {
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
        response.render("messageSignUp", {
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
    const user = await getUserDataService.getData(id);

    return response.render("editLogin", {
      user: user
    }); 
  } 
  async handleListUser(request: Request, response: Response) {
    const listUsersService = new LoginService();
    const list = await listUsersService.list();

    return response.render("ListLogin", {
      list: list
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
  async signInAutentication(request: Request, response: Response){
    const {username, password} = request.body;
    const singInAutenticationService = new LoginService();

    try {
      await singInAutenticationService.autentication({ username, password}).then(() => {
        response.render("message", {
          message: "Sesion iniciada exitosamente"
        });
      });
    } catch (err) {
      response.render("messageSignIn", {
        message: `Error al iniciar usuario: ${err.message}`
      });
    }
  }

}

export {LoginControllers};