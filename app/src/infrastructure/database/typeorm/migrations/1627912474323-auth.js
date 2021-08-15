const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class auth1627912474323 {
    name = 'auth1627912474323'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "auth"."users_types_user" ADD "main" character varying NOT NULL DEFAULT '1'`);
        await queryRunner.query(`ALTER TABLE "auth"."users_login_types" ADD "name" character varying NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "auth"."users_login_types"."name" IS 'nome do tipo de login'`);
        await queryRunner.query(`ALTER TABLE "auth"."users_groups_user" ALTER COLUMN "main" SET DEFAULT '1'`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "auth"."users_groups_user" ALTER COLUMN "main" DROP DEFAULT`);
        await queryRunner.query(`COMMENT ON COLUMN "auth"."users_login_types"."name" IS 'nome do tipo de login'`);
        await queryRunner.query(`ALTER TABLE "auth"."users_login_types" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "auth"."users_types_user" DROP COLUMN "main"`);
    }
}
