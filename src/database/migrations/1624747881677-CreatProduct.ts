import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateProduct1624747881677 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "products",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true
                    },
                    {
                        name: "productname",
                        type: "varchar"
                    },
                    {
                        name: "price",
                        type: "double"
                    },
                    {
                        name: "type",
                        type: "char"
                    },
                    {
                        name: "category_id",
                        type: "varchar"
                    }
                ]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("products");
    }

}
