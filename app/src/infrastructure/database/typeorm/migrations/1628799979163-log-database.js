const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class logDatabase1628799979163 {
    name = 'logDatabase1628799979163'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "log"."log_database" ("id" BIGSERIAL NOT NULL, "status" character NOT NULL DEFAULT '1', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "action" character varying NOT NULL, "user_id" integer NOT NULL, "data" text NOT NULL, CONSTRAINT "PK_2ea3e542acc5eafcaeafab54860" PRIMARY KEY ("id")); COMMENT ON COLUMN "log"."log_database"."status" IS 'situacao do registro. 1 - ativo, 0 - inativo'; COMMENT ON COLUMN "log"."log_database"."created_at" IS 'data de criacao do registro'; COMMENT ON COLUMN "log"."log_database"."updated_at" IS 'data de ALTERACAO do registro'; COMMENT ON COLUMN "log"."log_database"."deleted_at" IS 'data de EXCLUSAO do registro(soft-delete)'; COMMENT ON COLUMN "log"."log_database"."action" IS 'acao que foi realizada no banco'; COMMENT ON COLUMN "log"."log_database"."user_id" IS 'user_id que realizou a acao'; COMMENT ON COLUMN "log"."log_database"."data" IS 'dados que foram afetados.'`);
    }

    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "log"."log_database"`);
    }
}
