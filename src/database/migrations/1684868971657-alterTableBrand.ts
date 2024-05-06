import { MigrationInterface, QueryRunner } from "typeorm";

export class alterTableBrand1684868971657 implements MigrationInterface {
    name = 'alterTableBrand1684868971657'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "brand" RENAME COLUMN "name" TO "title"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "brand" RENAME COLUMN "title" TO "name"`);
    }

}
