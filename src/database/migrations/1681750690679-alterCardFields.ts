import { MigrationInterface, QueryRunner } from "typeorm";

export class alterCardFields1681750690679 implements MigrationInterface {
    name = 'alterCardFields1681750690679'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "card" ADD "isSold" boolean`);
        await queryRunner.query(`ALTER TABLE "card" DROP COLUMN "balance"`);
        await queryRunner.query(`ALTER TABLE "card" ADD "balance" numeric(6,2)`);
        await queryRunner.query(`ALTER TABLE "card" DROP COLUMN "sellingPrice"`);
        await queryRunner.query(`ALTER TABLE "card" ADD "sellingPrice" numeric(6,2)`);
        await queryRunner.query(`ALTER TABLE "card" DROP COLUMN "youWillGet"`);
        await queryRunner.query(`ALTER TABLE "card" ADD "youWillGet" numeric(6,2)`);
        await queryRunner.query(`ALTER TABLE "card" DROP COLUMN "geotag"`);
        await queryRunner.query(`ALTER TABLE "card" ADD "geotag" numeric(6,2)`);
        await queryRunner.query(`ALTER TABLE "card" DROP COLUMN "master_commision"`);
        await queryRunner.query(`ALTER TABLE "card" ADD "master_commision" numeric(6,2)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "card" DROP COLUMN "master_commision"`);
        await queryRunner.query(`ALTER TABLE "card" ADD "master_commision" integer`);
        await queryRunner.query(`ALTER TABLE "card" DROP COLUMN "geotag"`);
        await queryRunner.query(`ALTER TABLE "card" ADD "geotag" integer`);
        await queryRunner.query(`ALTER TABLE "card" DROP COLUMN "youWillGet"`);
        await queryRunner.query(`ALTER TABLE "card" ADD "youWillGet" integer`);
        await queryRunner.query(`ALTER TABLE "card" DROP COLUMN "sellingPrice"`);
        await queryRunner.query(`ALTER TABLE "card" ADD "sellingPrice" integer`);
        await queryRunner.query(`ALTER TABLE "card" DROP COLUMN "balance"`);
        await queryRunner.query(`ALTER TABLE "card" ADD "balance" integer`);
        await queryRunner.query(`ALTER TABLE "card" DROP COLUMN "isSold"`);
    }

}
