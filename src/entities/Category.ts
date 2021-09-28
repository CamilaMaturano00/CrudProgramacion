import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuid } from "uuid";
@Entity("categories")
class Category {

  @PrimaryColumn()
  id: string;

  @Column()
  username: string;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }

}

export { Category };