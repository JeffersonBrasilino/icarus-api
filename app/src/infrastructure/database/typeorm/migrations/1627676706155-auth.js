const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class auth1627676706155 {
    name = 'auth1627676706155'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "auth"."users_groups_user" RENAME COLUMN "principal" TO "main"`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "auth"."users_groups_user" RENAME COLUMN "main" TO "principal"`);
    }
}
