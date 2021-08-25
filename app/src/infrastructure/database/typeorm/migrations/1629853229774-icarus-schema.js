const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class icarusSchema1629853229774 {
    name = 'icarusSchema1629853229774'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "icarus"."applications" ("id" BIGSERIAL NOT NULL, "status" character NOT NULL DEFAULT '1', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "description" character varying NOT NULL, "public_key" character varying NOT NULL, "private_key" character varying NOT NULL, "third_party_application" character varying NOT NULL, CONSTRAINT "PK_938c0a27255637bde919591888f" PRIMARY KEY ("id")); COMMENT ON COLUMN "icarus"."applications"."status" IS 'situacao do registro. 1 - ativo, 0 - inativo'; COMMENT ON COLUMN "icarus"."applications"."created_at" IS 'data de criacao do registro'; COMMENT ON COLUMN "icarus"."applications"."updated_at" IS 'data de ALTERACAO do registro'; COMMENT ON COLUMN "icarus"."applications"."deleted_at" IS 'data de EXCLUSAO do registro(soft-delete)'; COMMENT ON COLUMN "icarus"."applications"."description" IS 'descricao da aplicacao'; COMMENT ON COLUMN "icarus"."applications"."public_key" IS 'chave publica que sera disponibilizado para a aplicacao(oauth)'; COMMENT ON COLUMN "icarus"."applications"."private_key" IS 'chave privada que sera disponibilizado para a aplicacao(oauth)'; COMMENT ON COLUMN "icarus"."applications"."third_party_application" IS 'identifica se a aplicação é uma aplicação de terceiro. 1 - sim 0 - não'`);
        await queryRunner.query(`CREATE TABLE "icarus"."api_routes" ("id" BIGSERIAL NOT NULL, "status" character NOT NULL DEFAULT '1', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "route" character varying NOT NULL, CONSTRAINT "PK_9ba16486d4b8d24487a2d43117f" PRIMARY KEY ("id")); COMMENT ON COLUMN "icarus"."api_routes"."status" IS 'situacao do registro. 1 - ativo, 0 - inativo'; COMMENT ON COLUMN "icarus"."api_routes"."created_at" IS 'data de criacao do registro'; COMMENT ON COLUMN "icarus"."api_routes"."updated_at" IS 'data de ALTERACAO do registro'; COMMENT ON COLUMN "icarus"."api_routes"."deleted_at" IS 'data de EXCLUSAO do registro(soft-delete)'; COMMENT ON COLUMN "icarus"."api_routes"."route" IS 'rota da api'`);
        await queryRunner.query(`CREATE TABLE "icarus"."users_types" ("id" BIGSERIAL NOT NULL, "status" character NOT NULL DEFAULT '1', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "name" character varying NOT NULL, CONSTRAINT "PK_0f4c03dc861d5bda6158028f202" PRIMARY KEY ("id")); COMMENT ON COLUMN "icarus"."users_types"."status" IS 'situacao do registro. 1 - ativo, 0 - inativo'; COMMENT ON COLUMN "icarus"."users_types"."created_at" IS 'data de criacao do registro'; COMMENT ON COLUMN "icarus"."users_types"."updated_at" IS 'data de ALTERACAO do registro'; COMMENT ON COLUMN "icarus"."users_types"."deleted_at" IS 'data de EXCLUSAO do registro(soft-delete)'; COMMENT ON COLUMN "icarus"."users_types"."name" IS 'nome do tipo de usuario'`);
        await queryRunner.query(`CREATE TABLE "icarus"."users_types_user" ("id" BIGSERIAL NOT NULL, "status" character NOT NULL DEFAULT '1', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "main" character varying NOT NULL DEFAULT '1', "user_id" bigint, "user_type_id" bigint, CONSTRAINT "PK_1f0dff3d6e65ceb45dff33a46b6" PRIMARY KEY ("id")); COMMENT ON COLUMN "icarus"."users_types_user"."status" IS 'situacao do registro. 1 - ativo, 0 - inativo'; COMMENT ON COLUMN "icarus"."users_types_user"."created_at" IS 'data de criacao do registro'; COMMENT ON COLUMN "icarus"."users_types_user"."updated_at" IS 'data de ALTERACAO do registro'; COMMENT ON COLUMN "icarus"."users_types_user"."deleted_at" IS 'data de EXCLUSAO do registro(soft-delete)'`);
        await queryRunner.query(`CREATE TABLE "icarus"."users_login_types" ("id" BIGSERIAL NOT NULL, "status" character NOT NULL DEFAULT '1', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "name" character varying NOT NULL, CONSTRAINT "PK_055df134f03706d386e0e0f445f" PRIMARY KEY ("id")); COMMENT ON COLUMN "icarus"."users_login_types"."status" IS 'situacao do registro. 1 - ativo, 0 - inativo'; COMMENT ON COLUMN "icarus"."users_login_types"."created_at" IS 'data de criacao do registro'; COMMENT ON COLUMN "icarus"."users_login_types"."updated_at" IS 'data de ALTERACAO do registro'; COMMENT ON COLUMN "icarus"."users_login_types"."deleted_at" IS 'data de EXCLUSAO do registro(soft-delete)'; COMMENT ON COLUMN "icarus"."users_login_types"."name" IS 'nome do tipo de login'`);
        await queryRunner.query(`CREATE TABLE "icarus"."person_contacts_type" ("id" BIGSERIAL NOT NULL, "status" character NOT NULL DEFAULT '1', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "description" character varying NOT NULL, CONSTRAINT "PK_f81d0f4b512b16d534243ab94bc" PRIMARY KEY ("id")); COMMENT ON COLUMN "icarus"."person_contacts_type"."status" IS 'situacao do registro. 1 - ativo, 0 - inativo'; COMMENT ON COLUMN "icarus"."person_contacts_type"."created_at" IS 'data de criacao do registro'; COMMENT ON COLUMN "icarus"."person_contacts_type"."updated_at" IS 'data de ALTERACAO do registro'; COMMENT ON COLUMN "icarus"."person_contacts_type"."deleted_at" IS 'data de EXCLUSAO do registro(soft-delete)'; COMMENT ON COLUMN "icarus"."person_contacts_type"."description" IS 'nome do tipo de contato'`);
        await queryRunner.query(`CREATE TABLE "icarus"."person_contacts" ("id" BIGSERIAL NOT NULL, "status" character NOT NULL DEFAULT '1', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "description" character varying NOT NULL, "main" character(1) NOT NULL, "person_id" bigint, "person_contact_type_id" bigint, CONSTRAINT "PK_07b8ffac6f3ee21ad90b7af50e2" PRIMARY KEY ("id")); COMMENT ON COLUMN "icarus"."person_contacts"."status" IS 'situacao do registro. 1 - ativo, 0 - inativo'; COMMENT ON COLUMN "icarus"."person_contacts"."created_at" IS 'data de criacao do registro'; COMMENT ON COLUMN "icarus"."person_contacts"."updated_at" IS 'data de ALTERACAO do registro'; COMMENT ON COLUMN "icarus"."person_contacts"."deleted_at" IS 'data de EXCLUSAO do registro(soft-delete)'; COMMENT ON COLUMN "icarus"."person_contacts"."main" IS 'chave verificadora do contato principal(pode ter somente um por tipo)'`);
        await queryRunner.query(`CREATE TABLE "icarus"."person" ("id" BIGSERIAL NOT NULL, "status" character NOT NULL DEFAULT '1', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_5fdaf670315c4b7e70cce85daa3" PRIMARY KEY ("id")); COMMENT ON COLUMN "icarus"."person"."status" IS 'situacao do registro. 1 - ativo, 0 - inativo'; COMMENT ON COLUMN "icarus"."person"."created_at" IS 'data de criacao do registro'; COMMENT ON COLUMN "icarus"."person"."updated_at" IS 'data de ALTERACAO do registro'; COMMENT ON COLUMN "icarus"."person"."deleted_at" IS 'data de EXCLUSAO do registro(soft-delete)'`);
        await queryRunner.query(`CREATE TABLE "icarus"."users" ("id" BIGSERIAL NOT NULL, "status" character NOT NULL DEFAULT '1', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "username" character varying NOT NULL, "password" character varying NOT NULL, "verification_code" character varying, "person_id" bigint, "users_login_type_id" bigint NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")); COMMENT ON COLUMN "icarus"."users"."status" IS 'situacao do registro. 1 - ativo, 0 - inativo'; COMMENT ON COLUMN "icarus"."users"."created_at" IS 'data de criacao do registro'; COMMENT ON COLUMN "icarus"."users"."updated_at" IS 'data de ALTERACAO do registro'; COMMENT ON COLUMN "icarus"."users"."deleted_at" IS 'data de EXCLUSAO do registro(soft-delete)'`);
        await queryRunner.query(`CREATE TABLE "icarus"."users_groups_user" ("id" BIGSERIAL NOT NULL, "status" character NOT NULL DEFAULT '1', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "main" character varying NOT NULL DEFAULT '0', "user_id" bigint, "user_group_id" bigint, CONSTRAINT "PK_3f4a7469c59e1c47a02a4f9ac50" PRIMARY KEY ("id")); COMMENT ON COLUMN "icarus"."users_groups_user"."status" IS 'situacao do registro. 1 - ativo, 0 - inativo'; COMMENT ON COLUMN "icarus"."users_groups_user"."created_at" IS 'data de criacao do registro'; COMMENT ON COLUMN "icarus"."users_groups_user"."updated_at" IS 'data de ALTERACAO do registro'; COMMENT ON COLUMN "icarus"."users_groups_user"."deleted_at" IS 'data de EXCLUSAO do registro(soft-delete)'`);
        await queryRunner.query(`CREATE TABLE "icarus"."users_groups" ("id" BIGSERIAL NOT NULL, "status" character NOT NULL DEFAULT '1', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "name" character varying NOT NULL, CONSTRAINT "PK_4644edf515e3c0b88e988522588" PRIMARY KEY ("id")); COMMENT ON COLUMN "icarus"."users_groups"."status" IS 'situacao do registro. 1 - ativo, 0 - inativo'; COMMENT ON COLUMN "icarus"."users_groups"."created_at" IS 'data de criacao do registro'; COMMENT ON COLUMN "icarus"."users_groups"."updated_at" IS 'data de ALTERACAO do registro'; COMMENT ON COLUMN "icarus"."users_groups"."deleted_at" IS 'data de EXCLUSAO do registro(soft-delete)'`);
        await queryRunner.query(`CREATE TABLE "icarus"."users_groups_permissions" ("id" BIGSERIAL NOT NULL, "status" character NOT NULL DEFAULT '1', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "action" character varying NOT NULL, "user_group_id" bigint, "api_route_application_id" bigint, CONSTRAINT "PK_cf8339b98ce063625755a4511cc" PRIMARY KEY ("id")); COMMENT ON COLUMN "icarus"."users_groups_permissions"."status" IS 'situacao do registro. 1 - ativo, 0 - inativo'; COMMENT ON COLUMN "icarus"."users_groups_permissions"."created_at" IS 'data de criacao do registro'; COMMENT ON COLUMN "icarus"."users_groups_permissions"."updated_at" IS 'data de ALTERACAO do registro'; COMMENT ON COLUMN "icarus"."users_groups_permissions"."deleted_at" IS 'data de EXCLUSAO do registro(soft-delete)'; COMMENT ON COLUMN "icarus"."users_groups_permissions"."action" IS 'acao que o grupo de usuario/aplicacao tem na rota. pode ser GET,POST,PUT,DELETE'`);
        await queryRunner.query(`CREATE TABLE "icarus"."api_routes_applications" ("id" BIGSERIAL NOT NULL, "status" character NOT NULL DEFAULT '1', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "application_id" bigint, "api_route_id" bigint, CONSTRAINT "PK_41894b41825efe59dbab24a7e26" PRIMARY KEY ("id")); COMMENT ON COLUMN "icarus"."api_routes_applications"."status" IS 'situacao do registro. 1 - ativo, 0 - inativo'; COMMENT ON COLUMN "icarus"."api_routes_applications"."created_at" IS 'data de criacao do registro'; COMMENT ON COLUMN "icarus"."api_routes_applications"."updated_at" IS 'data de ALTERACAO do registro'; COMMENT ON COLUMN "icarus"."api_routes_applications"."deleted_at" IS 'data de EXCLUSAO do registro(soft-delete)'`);
        await queryRunner.query(`CREATE TABLE "log"."log_database" ("id" BIGSERIAL NOT NULL, "status" character NOT NULL DEFAULT '1', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "table" character varying NOT NULL, "user_id" integer NOT NULL, "data" text NOT NULL, CONSTRAINT "PK_a6aaf2f5318b009ab959e9ea890" PRIMARY KEY ("id")); COMMENT ON COLUMN "log"."log_database"."status" IS 'situacao do registro. 1 - ativo, 0 - inativo'; COMMENT ON COLUMN "log"."log_database"."created_at" IS 'data de criacao do registro'; COMMENT ON COLUMN "log"."log_database"."updated_at" IS 'data de ALTERACAO do registro'; COMMENT ON COLUMN "log"."log_database"."deleted_at" IS 'data de EXCLUSAO do registro(soft-delete)'; COMMENT ON COLUMN "log"."log_database"."table" IS 'tabela que foi movimentada no banco'; COMMENT ON COLUMN "log"."log_database"."user_id" IS 'user_id que realizou a acao'; COMMENT ON COLUMN "log"."log_database"."data" IS 'dados que foram afetados.'`);
        await queryRunner.query(`CREATE TABLE "log"."log_request" ("id" BIGSERIAL NOT NULL, "status" character NOT NULL DEFAULT '1', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "user_id" integer NOT NULL, "route" character varying NOT NULL, "method" character varying NOT NULL, "data" text, CONSTRAINT "PK_75f6983809af582bbc475150d95" PRIMARY KEY ("id")); COMMENT ON COLUMN "log"."log_request"."status" IS 'situacao do registro. 1 - ativo, 0 - inativo'; COMMENT ON COLUMN "log"."log_request"."created_at" IS 'data de criacao do registro'; COMMENT ON COLUMN "log"."log_request"."updated_at" IS 'data de ALTERACAO do registro'; COMMENT ON COLUMN "log"."log_request"."deleted_at" IS 'data de EXCLUSAO do registro(soft-delete)'; COMMENT ON COLUMN "log"."log_request"."user_id" IS 'user que realizou a requisição'; COMMENT ON COLUMN "log"."log_request"."route" IS 'rota da requisicao'; COMMENT ON COLUMN "log"."log_request"."method" IS 'metodo da rota da requisicao'; COMMENT ON COLUMN "log"."log_request"."data" IS 'dados que foram enviados'`);
        await queryRunner.query(`ALTER TABLE "icarus"."users_types_user" ADD CONSTRAINT "FK_d7e659b31dc8b08038bf8dc6da2" FOREIGN KEY ("user_id") REFERENCES "icarus"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "icarus"."users_types_user" ADD CONSTRAINT "FK_36852e6b97a1c383caec425101b" FOREIGN KEY ("user_type_id") REFERENCES "icarus"."users_types"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "icarus"."person_contacts" ADD CONSTRAINT "FK_f93c944e8b6efe7d6c247e19e92" FOREIGN KEY ("person_id") REFERENCES "icarus"."person"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "icarus"."person_contacts" ADD CONSTRAINT "FK_3ea472b1e6a35e6efc8a4f665c4" FOREIGN KEY ("person_contact_type_id") REFERENCES "icarus"."person_contacts_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "icarus"."users" ADD CONSTRAINT "FK_5ed72dcd00d6e5a88c6a6ba3d18" FOREIGN KEY ("person_id") REFERENCES "icarus"."person"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "icarus"."users" ADD CONSTRAINT "FK_239fba36dee5354b15031abe27c" FOREIGN KEY ("users_login_type_id") REFERENCES "icarus"."users_login_types"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "icarus"."users_groups_user" ADD CONSTRAINT "FK_042c21883803e9c9df082554e52" FOREIGN KEY ("user_id") REFERENCES "icarus"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "icarus"."users_groups_user" ADD CONSTRAINT "FK_cadb59bc6c396ac74c743eb2788" FOREIGN KEY ("user_group_id") REFERENCES "icarus"."users_groups"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "icarus"."users_groups_permissions" ADD CONSTRAINT "FK_7c1b1727dd745bb5acb8c219c27" FOREIGN KEY ("user_group_id") REFERENCES "icarus"."users_groups"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "icarus"."users_groups_permissions" ADD CONSTRAINT "FK_cce6e1fb48228af8af1fd914311" FOREIGN KEY ("api_route_application_id") REFERENCES "icarus"."api_routes_applications"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "icarus"."api_routes_applications" ADD CONSTRAINT "FK_d1789ba113ab2f1ed9e3f3772b3" FOREIGN KEY ("application_id") REFERENCES "icarus"."applications"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "icarus"."api_routes_applications" ADD CONSTRAINT "FK_05def5b3fde2080239fd27575bd" FOREIGN KEY ("api_route_id") REFERENCES "icarus"."api_routes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "icarus"."api_routes_applications" DROP CONSTRAINT "FK_05def5b3fde2080239fd27575bd"`);
        await queryRunner.query(`ALTER TABLE "icarus"."api_routes_applications" DROP CONSTRAINT "FK_d1789ba113ab2f1ed9e3f3772b3"`);
        await queryRunner.query(`ALTER TABLE "icarus"."users_groups_permissions" DROP CONSTRAINT "FK_cce6e1fb48228af8af1fd914311"`);
        await queryRunner.query(`ALTER TABLE "icarus"."users_groups_permissions" DROP CONSTRAINT "FK_7c1b1727dd745bb5acb8c219c27"`);
        await queryRunner.query(`ALTER TABLE "icarus"."users_groups_user" DROP CONSTRAINT "FK_cadb59bc6c396ac74c743eb2788"`);
        await queryRunner.query(`ALTER TABLE "icarus"."users_groups_user" DROP CONSTRAINT "FK_042c21883803e9c9df082554e52"`);
        await queryRunner.query(`ALTER TABLE "icarus"."users" DROP CONSTRAINT "FK_239fba36dee5354b15031abe27c"`);
        await queryRunner.query(`ALTER TABLE "icarus"."users" DROP CONSTRAINT "FK_5ed72dcd00d6e5a88c6a6ba3d18"`);
        await queryRunner.query(`ALTER TABLE "icarus"."person_contacts" DROP CONSTRAINT "FK_3ea472b1e6a35e6efc8a4f665c4"`);
        await queryRunner.query(`ALTER TABLE "icarus"."person_contacts" DROP CONSTRAINT "FK_f93c944e8b6efe7d6c247e19e92"`);
        await queryRunner.query(`ALTER TABLE "icarus"."users_types_user" DROP CONSTRAINT "FK_36852e6b97a1c383caec425101b"`);
        await queryRunner.query(`ALTER TABLE "icarus"."users_types_user" DROP CONSTRAINT "FK_d7e659b31dc8b08038bf8dc6da2"`);
        await queryRunner.query(`DROP TABLE "log"."log_request"`);
        await queryRunner.query(`DROP TABLE "log"."log_database"`);
        await queryRunner.query(`DROP TABLE "icarus"."api_routes_applications"`);
        await queryRunner.query(`DROP TABLE "icarus"."users_groups_permissions"`);
        await queryRunner.query(`DROP TABLE "icarus"."users_groups"`);
        await queryRunner.query(`DROP TABLE "icarus"."users_groups_user"`);
        await queryRunner.query(`DROP TABLE "icarus"."users"`);
        await queryRunner.query(`DROP TABLE "icarus"."person"`);
        await queryRunner.query(`DROP TABLE "icarus"."person_contacts"`);
        await queryRunner.query(`DROP TABLE "icarus"."person_contacts_type"`);
        await queryRunner.query(`DROP TABLE "icarus"."users_login_types"`);
        await queryRunner.query(`DROP TABLE "icarus"."users_types_user"`);
        await queryRunner.query(`DROP TABLE "icarus"."users_types"`);
        await queryRunner.query(`DROP TABLE "icarus"."api_routes"`);
        await queryRunner.query(`DROP TABLE "icarus"."applications"`);
    }
}