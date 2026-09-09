import { MigrationInterface, QueryRunner } from "typeorm";

export class SchemaInit1788960461104 implements MigrationInterface {
    name = 'SchemaInit1788960461104'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "day_stats" ("id" SERIAL NOT NULL, "players_count" integer NOT NULL, "successful_players_count" integer NOT NULL DEFAULT '0', CONSTRAINT "PK_b5999f914ab7df8d25d494fd8dc" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "words_of_the_day" ("id" SERIAL NOT NULL, "word" character varying(27) NOT NULL, "date" TIMESTAMP WITH TIME ZONE NOT NULL, CONSTRAINT "PK_d246e846a610b8c07754487d704" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "words_of_the_day"`);
        await queryRunner.query(`DROP TABLE "day_stats"`);
    }

}
