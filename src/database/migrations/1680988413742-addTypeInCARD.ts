import { MigrationInterface, QueryRunner } from "typeorm";

export class addTypeInCARD1680988413742 implements MigrationInterface {
    name = 'addTypeInCARD1680988413742'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "card" ADD "type" character varying`);
        await queryRunner.query(`ALTER TABLE "card" DROP COLUMN "serialNumber"`);
        await queryRunner.query(`ALTER TABLE "card" ADD "serialNumber" bigint`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "card" DROP COLUMN "serialNumber"`);
        await queryRunner.query(`ALTER TABLE "card" ADD "serialNumber" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "card" DROP COLUMN "type"`);
    }

}
