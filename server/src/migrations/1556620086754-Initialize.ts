import {MigrationInterface, QueryRunner} from "typeorm";

export class Initialize1556620086754 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "email" character varying NOT NULL, "password" character varying(60) NOT NULL, "image_url" character varying, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "lists" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "title" character varying NOT NULL, "author_id" integer NOT NULL, CONSTRAINT "PK_268b525e9a6dd04d0685cb2aaaa" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "list_items" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "content" character varying NOT NULL, "checked" boolean NOT NULL DEFAULT false, "list_id" integer NOT NULL, "author_id" integer NOT NULL, CONSTRAINT "PK_26260957b2b71a1d8e2ecd005f8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "lists" ADD CONSTRAINT "FK_5cef9004a6c5a5c170d029d7d12" FOREIGN KEY ("author_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "list_items" ADD CONSTRAINT "FK_8bf07909d6d9e95e8e637bd5b3e" FOREIGN KEY ("list_id") REFERENCES "lists"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "list_items" ADD CONSTRAINT "FK_b5ed6294ef5c1ce09496f3abafa" FOREIGN KEY ("author_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "list_items" DROP CONSTRAINT "FK_b5ed6294ef5c1ce09496f3abafa"`);
        await queryRunner.query(`ALTER TABLE "list_items" DROP CONSTRAINT "FK_8bf07909d6d9e95e8e637bd5b3e"`);
        await queryRunner.query(`ALTER TABLE "lists" DROP CONSTRAINT "FK_5cef9004a6c5a5c170d029d7d12"`);
        await queryRunner.query(`DROP TABLE "list_items"`);
        await queryRunner.query(`DROP TABLE "lists"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
