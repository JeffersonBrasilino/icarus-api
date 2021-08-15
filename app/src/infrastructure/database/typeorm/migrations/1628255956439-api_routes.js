const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class apiRoutes1628255956439 {
    name = 'apiRoutes1628255956439'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "auth"."api_routes" DROP COLUMN "require_auth"`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "auth"."api_routes" ADD "require_auth" character varying NOT NULL`);
    }
}
