const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class apiRotas1627319739378 {
    name = 'apiRotas1627319739378'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "api_rotas_acoes" DROP CONSTRAINT "FK_40b4265127e22b72bd43a5bf08a"`);
        await queryRunner.query(`ALTER TABLE "api_rotas_acoes" ALTER COLUMN "api_rotas_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "api_rotas_acoes" ADD CONSTRAINT "FK_40b4265127e22b72bd43a5bf08a" FOREIGN KEY ("api_rotas_id") REFERENCES "api_rotas"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "api_rotas_acoes" DROP CONSTRAINT "FK_40b4265127e22b72bd43a5bf08a"`);
        await queryRunner.query(`ALTER TABLE "api_rotas_acoes" ALTER COLUMN "api_rotas_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "api_rotas_acoes" ADD CONSTRAINT "FK_40b4265127e22b72bd43a5bf08a" FOREIGN KEY ("api_rotas_id") REFERENCES "api_rotas"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
}
