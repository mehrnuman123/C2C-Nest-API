import { MigrationInterface, QueryRunner } from "typeorm";

export class addPhotoFieldForCard1681754018490 implements MigrationInterface {
    name = 'addPhotoFieldForCard1681754018490'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "card" ADD "photo" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "card" DROP COLUMN "photo"`);
    }

}
