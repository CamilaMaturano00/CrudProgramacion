import {MigrationInterface, QueryRunner} from "typeorm";

export class ProductCategory1634343289561 implements MigrationInterface {
    name = 'ProductCategory1634343289561'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "products" ("id" varchar PRIMARY KEY NOT NULL, "productname" varchar NOT NULL, "price" integer NOT NULL, "type" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`CREATE TABLE "categories" ("id" varchar PRIMARY KEY NOT NULL, "categoryname" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "productId" varchar)`);
        await queryRunner.query(`CREATE TABLE "users" ("id" varchar PRIMARY KEY NOT NULL, "username" varchar NOT NULL, "email" varchar NOT NULL, "phone" varchar NOT NULL, "city" varchar NOT NULL, "state" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`CREATE TABLE "temporary_categories" ("id" varchar PRIMARY KEY NOT NULL, "categoryname" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "productId" varchar, CONSTRAINT "FK_40b29caafc0bbdf6d98a3ad2e41" FOREIGN KEY ("productId") REFERENCES "products" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_categories"("id", "categoryname", "created_at", "updated_at", "productId") SELECT "id", "categoryname", "created_at", "updated_at", "productId" FROM "categories"`);
        await queryRunner.query(`DROP TABLE "categories"`);
        await queryRunner.query(`ALTER TABLE "temporary_categories" RENAME TO "categories"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "categories" RENAME TO "temporary_categories"`);
        await queryRunner.query(`CREATE TABLE "categories" ("id" varchar PRIMARY KEY NOT NULL, "categoryname" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "productId" varchar)`);
        await queryRunner.query(`INSERT INTO "categories"("id", "categoryname", "created_at", "updated_at", "productId") SELECT "id", "categoryname", "created_at", "updated_at", "productId" FROM "temporary_categories"`);
        await queryRunner.query(`DROP TABLE "temporary_categories"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "categories"`);
        await queryRunner.query(`DROP TABLE "products"`);
    }

}
