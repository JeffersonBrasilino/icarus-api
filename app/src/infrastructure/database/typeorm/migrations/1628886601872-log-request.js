const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class logRequest1628886601872 {
    name = 'logRequest1628886601872'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "log"."log_request" ("id" BIGSERIAL NOT NULL, "status" character NOT NULL DEFAULT '1', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "user_id" integer NOT NULL, "route" character varying NOT NULL, "method" character varying NOT NULL, "data" text, CONSTRAINT "PK_49e60cd4319a0bb623a7c5db132" PRIMARY KEY ("id")); COMMENT ON COLUMN "log"."log_request"."status" IS 'situacao do registro. 1 - ativo, 0 - inativo'; COMMENT ON COLUMN "log"."log_request"."created_at" IS 'data de criacao do registro'; COMMENT ON COLUMN "log"."log_request"."updated_at" IS 'data de ALTERACAO do registro'; COMMENT ON COLUMN "log"."log_request"."deleted_at" IS 'data de EXCLUSAO do registro(soft-delete)'; COMMENT ON COLUMN "log"."log_request"."user_id" IS 'user que realizou a requisição'; COMMENT ON COLUMN "log"."log_request"."route" IS 'rota da requisicao'; COMMENT ON COLUMN "log"."log_request"."method" IS 'metodo da rota da requisicao'; COMMENT ON COLUMN "log"."log_request"."data" IS 'dados que foram enviados'`);
    }

    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "log"."log_request"`);
    }
}
