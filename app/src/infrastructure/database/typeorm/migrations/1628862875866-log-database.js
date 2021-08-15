const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class logDatabase1628862875866 {
    name = 'logDatabase1628862875866'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "log"."log_database" RENAME COLUMN "action" TO "table"`);
        await queryRunner.query(`COMMENT ON COLUMN "log"."log_database"."table" IS 'tabela que foi movimentada no banco'`);
    }

    async down(queryRunner) {
        await queryRunner.query(`COMMENT ON COLUMN "log"."log_database"."table" IS 'acao que foi realizada no banco'`);
        await queryRunner.query(`ALTER TABLE "log"."log_database" RENAME COLUMN "table" TO "action"`);
    }
}
