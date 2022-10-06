import { MigrationInterface, QueryRunner } from "typeorm";

export class initial1665068758225 implements MigrationInterface {
    name = 'initial1665068758225'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."transactions_type_enum" AS ENUM('deposit', 'withdraw')`);
        await queryRunner.query(`CREATE TABLE "transactions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "type" "public"."transactions_type_enum" NOT NULL, "account" numeric NOT NULL, "client_id" integer, CONSTRAINT "PK_a219afd8dd77ed80f5a862f1db9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "banker" ("id" SERIAL NOT NULL, "first_name" character varying NOT NULL, "last_name" character varying NOT NULL, "email" character varying NOT NULL, "card_number" character varying(10) NOT NULL, "balance" numeric NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "employee_number" character varying(10) NOT NULL, CONSTRAINT "UQ_c1944a58f7ecf3afbfe23173723" UNIQUE ("email"), CONSTRAINT "UQ_8069c792f02262882252b843491" UNIQUE ("card_number"), CONSTRAINT "UQ_277df013559cb6637ad9a5fe312" UNIQUE ("employee_number"), CONSTRAINT "PK_3b517d2449b13a1a9b41c949e3a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "client" ("id" SERIAL NOT NULL, "first_name" character varying NOT NULL, "last_name" character varying NOT NULL, "email" character varying NOT NULL, "card_number" character varying(10) NOT NULL, "balance" numeric NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "active" boolean NOT NULL DEFAULT true, "additional_info" text, "family_members" text NOT NULL DEFAULT '[]', CONSTRAINT "UQ_6436cc6b79593760b9ef921ef12" UNIQUE ("email"), CONSTRAINT "UQ_bc0c644bf2e06d38466b66ecd66" UNIQUE ("card_number"), CONSTRAINT "PK_96da49381769303a6515a8785c7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "bankers_client" ("banker" integer NOT NULL, "client" integer NOT NULL, CONSTRAINT "PK_fe7d26145e764b2246fc159b529" PRIMARY KEY ("banker", "client"))`);
        await queryRunner.query(`CREATE INDEX "IDX_89ad82f98cec93a68d1da2fdfb" ON "bankers_client" ("banker") `);
        await queryRunner.query(`CREATE INDEX "IDX_c9b9a2168a089f1d4a469d3f64" ON "bankers_client" ("client") `);
        await queryRunner.query(`ALTER TABLE "transactions" ADD CONSTRAINT "FK_ebb352c973d8a85e8779a15ff35" FOREIGN KEY ("client_id") REFERENCES "client"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "bankers_client" ADD CONSTRAINT "FK_89ad82f98cec93a68d1da2fdfbd" FOREIGN KEY ("banker") REFERENCES "banker"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "bankers_client" ADD CONSTRAINT "FK_c9b9a2168a089f1d4a469d3f646" FOREIGN KEY ("client") REFERENCES "client"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bankers_client" DROP CONSTRAINT "FK_c9b9a2168a089f1d4a469d3f646"`);
        await queryRunner.query(`ALTER TABLE "bankers_client" DROP CONSTRAINT "FK_89ad82f98cec93a68d1da2fdfbd"`);
        await queryRunner.query(`ALTER TABLE "transactions" DROP CONSTRAINT "FK_ebb352c973d8a85e8779a15ff35"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c9b9a2168a089f1d4a469d3f64"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_89ad82f98cec93a68d1da2fdfb"`);
        await queryRunner.query(`DROP TABLE "bankers_client"`);
        await queryRunner.query(`DROP TABLE "client"`);
        await queryRunner.query(`DROP TABLE "banker"`);
        await queryRunner.query(`DROP TABLE "transactions"`);
        await queryRunner.query(`DROP TYPE "public"."transactions_type_enum"`);
    }

}
