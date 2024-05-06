import { MigrationInterface, QueryRunner } from "typeorm";

export class addWalletCardUserTable1680353755098 implements MigrationInterface {
    name = 'addWalletCardUserTable1680353755098'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."user_role_enum" AS ENUM('master', 'admin', 'user')`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "name" character varying, "email" character varying(100), "password" character varying, "status" character varying DEFAULT 'offline', "uid" character varying, "auth_provider" character varying, "profile" character varying, "role" "public"."user_role_enum" NOT NULL, "phoneNumber" integer, "isActive" boolean DEFAULT false, "company" character varying, "createdAt" TIMESTAMP WITH TIME ZONE, "updatedAt" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "card" ("id" SERIAL NOT NULL, "ownerId" integer, "serialNumber" integer NOT NULL, "manufacturer" character varying(200), "balance" integer, "sellingPrice" integer, "youWillGet" integer, "geotag" integer, "pin" integer, "category" character varying, "expiry" character varying, "isActive" boolean, "isListed" boolean, "discount" integer, "isVerified" boolean DEFAULT false, "createdAt" TIMESTAMP WITH TIME ZONE, "updatedAt" TIMESTAMP WITH TIME ZONE, "user_id" integer, CONSTRAINT "PK_9451069b6f1199730791a7f4ae4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "card" ADD CONSTRAINT "FK_00ec72ad98922117bad8a86f980" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "card" DROP CONSTRAINT "FK_00ec72ad98922117bad8a86f980"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_922e8c1d396025973ec81e2a402"`);
        await queryRunner.query(`DROP TABLE "card"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TYPE "public"."user_role_enum"`);
    }

}
