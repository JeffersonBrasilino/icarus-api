const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class auth1627990411757 {
    name = 'auth1627990411757'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "auth"."users" RENAME COLUMN "login" TO "username"`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "auth"."users" RENAME COLUMN "username" TO "login"`);
    }
}
