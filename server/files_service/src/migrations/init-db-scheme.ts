import { MigrationInterface, QueryRunner } from "typeorm";

export class InitDbScheme1704888462707 implements MigrationInterface {
    name = 'InitDbScheme1704888462707'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "files" ("id" SERIAL NOT NULL, "mode" character varying NOT NULL, "fileDir" character varying NOT NULL, "fileName" character varying NOT NULL, "fileType" character varying NOT NULL, CONSTRAINT "PK_6c16b9093a142e0e7613b04a3d9" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "files"`);
    }

}
