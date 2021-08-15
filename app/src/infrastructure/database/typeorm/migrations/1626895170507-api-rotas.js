const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class apiRotas1626895170507 {
    name = 'apiRotas1626895170507'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "api_rotas" ("id" BIGSERIAL NOT NULL, "rota" character varying NOT NULL, "status" character NOT NULL DEFAULT '1', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_8e10477c860d08c8db2136f0f66" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "api_rotas_acoes" ("id" BIGSERIAL NOT NULL, "acao" character varying(20) NOT NULL, "status" character NOT NULL DEFAULT '1', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "api_rotas_id" bigint, CONSTRAINT "PK_306e87a76863b81cc489117d10b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "api_rotas_acoes" ADD CONSTRAINT "FK_40b4265127e22b72bd43a5bf08a" FOREIGN KEY ("api_rotas_id") REFERENCES "api_rotas"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "api_rotas_acoes" DROP CONSTRAINT "FK_40b4265127e22b72bd43a5bf08a"`);
        await queryRunner.query(`DROP TABLE "api_rotas_acoes"`);
        await queryRunner.query(`DROP TABLE "api_rotas"`);
    }
}
