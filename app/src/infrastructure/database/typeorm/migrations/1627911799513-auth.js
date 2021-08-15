const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class auth1627911799513 {
    name = 'auth1627911799513'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "auth"."users_types" ADD "name" character varying NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "auth"."users_types"."name" IS 'nome do tipo de usuario'`);
    }

    async down(queryRunner) {
        await queryRunner.query(`COMMENT ON COLUMN "auth"."users_types"."name" IS 'nome do tipo de usuario'`);
        await queryRunner.query(`ALTER TABLE "auth"."users_types" DROP COLUMN "name"`);
    }
}
