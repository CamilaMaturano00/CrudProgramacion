import { getCustomRepository } from "typeorm";
import { LoginRepository } from "../repositories/LoginRepository";
import { Login } from "../entities/Login";
import { response } from "express";

interface ILogin {
    id?: string;
    username: string;
    password: number
  }
class LoginService {
      async create({ username, password }: ILogin) {
        if (!username || !password) {
          throw new Error("Por favor rellenar todos los campos");
        }
    
        const loginRepository = getCustomRepository(LoginRepository);
    
        const loginAlreadyExists = await loginRepository.findOne({ username });
    
        if (loginAlreadyExists) {
          throw new Error("El nombre de usuario ya esta registrado");
        }
    
        const login = loginRepository.create({ username, password });
    
        await loginRepository.save(login);
    
        return login;
      }
      async delete(id: string) {
        const loginRepository = getCustomRepository(LoginRepository);
    
        const user = await loginRepository
          .createQueryBuilder()
          .delete()
          .from(Login)
          .where("id = :id", { id })
          .execute();
    
        return user;
      }
      async getData(id: string) {
        const loginRepository = getCustomRepository(LoginRepository);
    
        const login = await loginRepository.findOne(id);
    
        return login;
      }
      async list() {
        const loginRepository = getCustomRepository(LoginRepository);
    
        const login = await loginRepository.find();
    
        return login;
      }
      async search(search: string) {
        if (!search) {
          throw new Error("Por favor complete el campo de búsquedad");
        }
    
        const loginRepository = getCustomRepository(LoginRepository);
    
        const login = await loginRepository
          .createQueryBuilder()
          .where("username like :search", { search: `%${search}%` })
          .orWhere("password like :search", { search: `%${search}%` })
          .getMany();
    
        return login;
    
      }
      async update({ id, username, password }: ILogin) {
        const loginRepository = getCustomRepository(LoginRepository);

        const login = await loginRepository
          .createQueryBuilder()
          .update(Login)
          .set({ username, password })
          .where("id = :id", { id })
          .execute();
    
        return login;
    
      }

    async autentication({username, password}: ILogin){
      const loginRepository = getCustomRepository(LoginRepository);
      const userAlreadyExists = await loginRepository.findOne({ username });
      const passwordAlreadyExists = await loginRepository.findOne({password})

      if (!username && !password) {
        throw new Error("Por favor rellenar todos los campos");
      }

      if (userAlreadyExists && passwordAlreadyExists) {
        return true;
      }
      else{
        throw new Error ("Usuario o contraseña incorrecta");
      }
    }
  

}

export {LoginService};