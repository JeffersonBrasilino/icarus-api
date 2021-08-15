const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class apiRotas1626895430926 {
    name = 'apiRotas1626895430926'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "api_rotas_acoes" ADD "autenticada" character NOT NULL DEFAULT '1'`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "api_rotas_acoes" DROP COLUMN "autenticada"`);
    }
}
