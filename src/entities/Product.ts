import { Column, CreateDateColumn,Entity, JoinColumn, JoinTable, OneToMany, PrimaryColumn, UpdateDateColumn  } from "typeorm";
import { v4 as uuid } from "uuid";
import { Category } from "./Category";
@Entity("products")
class Product {

  @PrimaryColumn()
  id: string;

  @Column()
  productname: string;

  @Column()
  price: number;

  @Column()
  type: string ;

  @OneToMany(() => Category, category => category.categoryname)
  @JoinTable()
  category: Category[];

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

export { Product };