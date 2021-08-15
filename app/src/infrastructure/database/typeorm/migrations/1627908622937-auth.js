const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class auth1627908622937 {
    name = 'auth1627908622937'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "auth"."applications" ("id" BIGSERIAL NOT NULL, "status" character NOT NULL DEFAULT '1', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "description" character varying NOT NULL, "public_key" character varying NOT NULL, "private_key" character varying NOT NULL, "third_party_application" character varying NOT NULL, CONSTRAINT "PK_0320de27207a0fa5b1df49b36fe" PRIMARY KEY ("id")); COMMENT ON COLUMN "auth"."applications"."status" IS 'situacao do registro. 1 - ativo, 0 - inativo'; COMMENT ON COLUMN "auth"."applications"."created_at" IS 'data de criacao do registro'; COMMENT ON COLUMN "auth"."applications"."updated_at" IS 'data de ALTERACAO do registro'; COMMENT ON COLUMN "auth"."applications"."deleted_at" IS 'data de EXCLUSAO do registro(soft-delete)'; COMMENT ON COLUMN "auth"."applications"."description" IS 'descricao da aplicacao'; COMMENT ON COLUMN "auth"."applications"."public_key" IS 'chave publica que sera disponibilizado para a aplicacao(oauth)'; COMMENT ON COLUMN "auth"."applications"."private_key" IS 'chave privada que sera disponibilizado para a aplicacao(oauth)'; COMMENT ON COLUMN "auth"."applications"."third_party_application" IS 'identifica se a aplicação é uma aplicação de terceiro. 1 - sim 0 - não'`);
        await queryRunner.query(`CREATE TABLE "auth"."api_routes" ("id" BIGSERIAL NOT NULL, "status" character NOT NULL DEFAULT '1', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "route" character varying NOT NULL, "require_auth" character varying NOT NULL, CONSTRAINT "PK_f3e07db9a76e07ffb5ef628a1f4" PRIMARY KEY ("id")); COMMENT ON COLUMN "auth"."api_routes"."status" IS 'situacao do registro. 1 - ativo, 0 - inativo'; COMMENT ON COLUMN "auth"."api_routes"."created_at" IS 'data de criacao do registro'; COMMENT ON COLUMN "auth"."api_routes"."updated_at" IS 'data de ALTERACAO do registro'; COMMENT ON COLUMN "auth"."api_routes"."deleted_at" IS 'data de EXCLUSAO do registro(soft-delete)'; COMMENT ON COLUMN "auth"."api_routes"."route" IS 'rota da api'; COMMENT ON COLUMN "auth"."api_routes"."require_auth" IS 'diz se a rota requer autenticação; 1-sim, 2-não'`);
        await queryRunner.query(`CREATE TABLE "auth"."users_groups_permissions" ("id" BIGSERIAL NOT NULL, "status" character NOT NULL DEFAULT '1', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "action" character varying NOT NULL, "user_group_id" bigint, "api_route_application_id" bigint, CONSTRAINT "PK_c51fa569feb00b97d9c5e9d17db" PRIMARY KEY ("id")); COMMENT ON COLUMN "auth"."users_groups_permissions"."status" IS 'situacao do registro. 1 - ativo, 0 - inativo'; COMMENT ON COLUMN "auth"."users_groups_permissions"."created_at" IS 'data de criacao do registro'; COMMENT ON COLUMN "auth"."users_groups_permissions"."updated_at" IS 'data de ALTERACAO do registro'; COMMENT ON COLUMN "auth"."users_groups_permissions"."deleted_at" IS 'data de EXCLUSAO do registro(soft-delete)'; COMMENT ON COLUMN "auth"."users_groups_permissions"."action" IS 'acao que o grupo de usuario/aplicacao tem na rota. pode ser GET,POST,PUT,DELETE'`);
        await queryRunner.query(`CREATE TABLE "auth"."api_routes_applications" ("id" BIGSERIAL NOT NULL, "status" character NOT NULL DEFAULT '1', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "apllication_id" bigint, "api_route_id" bigint, CONSTRAINT "PK_2d5360d96814973051d2030ac73" PRIMARY KEY ("id")); COMMENT ON COLUMN "auth"."api_routes_applications"."status" IS 'situacao do registro. 1 - ativo, 0 - inativo'; COMMENT ON COLUMN "auth"."api_routes_applications"."created_at" IS 'data de criacao do registro'; COMMENT ON COLUMN "auth"."api_routes_applications"."updated_at" IS 'data de ALTERACAO do registro'; COMMENT ON COLUMN "auth"."api_routes_applications"."deleted_at" IS 'data de EXCLUSAO do registro(soft-delete)'`);
        await queryRunner.query(`COMMENT ON COLUMN "auth"."users_types"."status" IS 'situacao do registro. 1 - ativo, 0 - inativo'`);
        await queryRunner.query(`COMMENT ON COLUMN "auth"."users_types"."created_at" IS 'data de criacao do registro'`);
        await queryRunner.query(`COMMENT ON COLUMN "auth"."users_types"."updated_at" IS 'data de ALTERACAO do registro'`);
        await queryRunner.query(`COMMENT ON COLUMN "auth"."users_types"."deleted_at" IS 'data de EXCLUSAO do registro(soft-delete)'`);
        await queryRunner.query(`COMMENT ON COLUMN "auth"."users_types_user"."status" IS 'situacao do registro. 1 - ativo, 0 - inativo'`);
        await queryRunner.query(`COMMENT ON COLUMN "auth"."users_types_user"."created_at" IS 'data de criacao do registro'`);
        await queryRunner.query(`COMMENT ON COLUMN "auth"."users_types_user"."updated_at" IS 'data de ALTERACAO do registro'`);
        await queryRunner.query(`COMMENT ON COLUMN "auth"."users_types_user"."deleted_at" IS 'data de EXCLUSAO do registro(soft-delete)'`);
        await queryRunner.query(`COMMENT ON COLUMN "auth"."users_login_types"."status" IS 'situacao do registro. 1 - ativo, 0 - inativo'`);
        await queryRunner.query(`COMMENT ON COLUMN "auth"."users_login_types"."created_at" IS 'data de criacao do registro'`);
        await queryRunner.query(`COMMENT ON COLUMN "auth"."users_login_types"."updated_at" IS 'data de ALTERACAO do registro'`);
        await queryRunner.query(`COMMENT ON COLUMN "auth"."users_login_types"."deleted_at" IS 'data de EXCLUSAO do registro(soft-delete)'`);
        await queryRunner.query(`COMMENT ON COLUMN "auth"."users"."status" IS 'situacao do registro. 1 - ativo, 0 - inativo'`);
        await queryRunner.query(`COMMENT ON COLUMN "auth"."users"."created_at" IS 'data de criacao do registro'`);
        await queryRunner.query(`COMMENT ON COLUMN "auth"."users"."updated_at" IS 'data de ALTERACAO do registro'`);
        await queryRunner.query(`COMMENT ON COLUMN "auth"."users"."deleted_at" IS 'data de EXCLUSAO do registro(soft-delete)'`);
        await queryRunner.query(`COMMENT ON COLUMN "auth"."users_groups_user"."status" IS 'situacao do registro. 1 - ativo, 0 - inativo'`);
        await queryRunner.query(`COMMENT ON COLUMN "auth"."users_groups_user"."created_at" IS 'data de criacao do registro'`);
        await queryRunner.query(`COMMENT ON COLUMN "auth"."users_groups_user"."updated_at" IS 'data de ALTERACAO do registro'`);
        await queryRunner.query(`COMMENT ON COLUMN "auth"."users_groups_user"."deleted_at" IS 'data de EXCLUSAO do registro(soft-delete)'`);
        await queryRunner.query(`COMMENT ON COLUMN "auth"."users_groups"."status" IS 'situacao do registro. 1 - ativo, 0 - inativo'`);
        await queryRunner.query(`COMMENT ON COLUMN "auth"."users_groups"."created_at" IS 'data de criacao do registro'`);
        await queryRunner.query(`COMMENT ON COLUMN "auth"."users_groups"."updated_at" IS 'data de ALTERACAO do registro'`);
        await queryRunner.query(`COMMENT ON COLUMN "auth"."users_groups"."deleted_at" IS 'data de EXCLUSAO do registro(soft-delete)'`);
        await queryRunner.query(`ALTER TABLE "auth"."users_groups_permissions" ADD CONSTRAINT "FK_ab3065f4a8f1db08d455f091584" FOREIGN KEY ("user_group_id") REFERENCES "auth"."users_groups"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "auth"."users_groups_permissions" ADD CONSTRAINT "FK_f6735fdf4dca76c56c8a119e2aa" FOREIGN KEY ("api_route_application_id") REFERENCES "auth"."api_routes_applications"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "auth"."api_routes_applications" ADD CONSTRAINT "FK_7aaa7bb3b5dd51ffee502a8ba70" FOREIGN KEY ("apllication_id") REFERENCES "auth"."applications"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "auth"."api_routes_applications" ADD CONSTRAINT "FK_02ef1355b2a5329ccfbbec75c72" FOREIGN KEY ("api_route_id") REFERENCES "auth"."api_routes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "auth"."api_routes_applications" DROP CONSTRAINT "FK_02ef1355b2a5329ccfbbec75c72"`);
        await queryRunner.query(`ALTER TABLE "auth"."api_routes_applications" DROP CONSTRAINT "FK_7aaa7bb3b5dd51ffee502a8ba70"`);
        await queryRunner.query(`ALTER TABLE "auth"."users_groups_permissions" DROP CONSTRAINT "FK_f6735fdf4dca76c56c8a119e2aa"`);
        await queryRunner.query(`ALTER TABLE "auth"."users_groups_permissions" DROP CONSTRAINT "FK_ab3065f4a8f1db08d455f091584"`);
        await queryRunner.query(`COMMENT ON COLUMN "auth"."users_groups"."deleted_at" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "auth"."users_groups"."updated_at" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "auth"."users_groups"."created_at" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "auth"."users_groups"."status" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "auth"."users_groups_user"."deleted_at" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "auth"."users_groups_user"."updated_at" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "auth"."users_groups_user"."created_at" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "auth"."users_groups_user"."status" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "auth"."users"."deleted_at" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "auth"."users"."updated_at" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "auth"."users"."created_at" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "auth"."users"."status" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "auth"."users_login_types"."deleted_at" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "auth"."users_login_types"."updated_at" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "auth"."users_login_types"."created_at" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "auth"."users_login_types"."status" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "auth"."users_types_user"."deleted_at" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "auth"."users_types_user"."updated_at" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "auth"."users_types_user"."created_at" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "auth"."users_types_user"."status" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "auth"."users_types"."deleted_at" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "auth"."users_types"."updated_at" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "auth"."users_types"."created_at" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "auth"."users_types"."status" IS NULL`);
        await queryRunner.query(`DROP TABLE "auth"."api_routes_applications"`);
        await queryRunner.query(`DROP TABLE "auth"."users_groups_permissions"`);
        await queryRunner.query(`DROP TABLE "auth"."api_routes"`);
        await queryRunner.query(`DROP TABLE "auth"."applications"`);
    }
}
