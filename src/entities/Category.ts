import {Column,CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn, ManyToOne,JoinTable}from "typeorm";
import { v4 as uuid } from "uuid";
import { Product } from "./Product";
@Entity("categories")
class Category {

  @PrimaryColumn()
  id: string;

  @Column()
  categoryname: string;

  @ManyToOne(() => Product, product => product.category)
  product: Product;

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

export { Category };