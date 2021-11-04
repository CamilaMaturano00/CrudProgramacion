import {Column,CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn, OneToMany}from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("login")
class Login {

  @PrimaryColumn()
  id?: string;

  @Column()
  username: string;

  @Column()
  password: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }

}

export { Login };