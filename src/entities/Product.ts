import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuid } from "uuid";
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

  @Column()
  category_id: string;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { Product };