import {MigrationInterface, QueryRunner} from "typeorm";

export class Login1635705795075 implements MigrationInterface {
    name = 'Login1635705795075'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "login" ("id" varchar PRIMARY KEY NOT NULL, "username" varchar NOT NULL, "password" integer NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "login"`);
    }

}
