const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class auth1627676444192 {
    name = 'auth1627676444192'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "auth"."users_types" ("id" BIGSERIAL NOT NULL, "status" character NOT NULL DEFAULT '1', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_bdc1cb97612c65b9d41be5c2246" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "auth"."users_types_user" ("id" BIGSERIAL NOT NULL, "status" character NOT NULL DEFAULT '1', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "user_id" bigint, "user_type_id" bigint, CONSTRAINT "PK_f107d851cf2606f22dd42358a02" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "auth"."users_login_types" ("id" BIGSERIAL NOT NULL, "status" character NOT NULL DEFAULT '1', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_01f3c7a9bdb5d6bf2db9d99cebc" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "auth"."users" ("id" BIGSERIAL NOT NULL, "status" character NOT NULL DEFAULT '1', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "login" character varying NOT NULL, "password" character varying NOT NULL, "person_id" integer NOT NULL, "verification_code" character varying NOT NULL, "users_login_type_id" bigint, CONSTRAINT "PK_c88cc8077366b470dafc2917366" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "auth"."users_groups" ("id" BIGSERIAL NOT NULL, "status" character NOT NULL DEFAULT '1', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "name" character varying NOT NULL, CONSTRAINT "PK_2042b8cd1b75c48e5aef83ad42c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "auth"."users_groups_user" ("id" BIGSERIAL NOT NULL, "status" character NOT NULL DEFAULT '1', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "principal" character varying NOT NULL, "user_id" bigint, "user_group_id" bigint, CONSTRAINT "PK_f353534c9505c3198bedb097704" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "auth"."users_types_user" ADD CONSTRAINT "FK_d428b3f61a21867030c20399092" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "auth"."users_types_user" ADD CONSTRAINT "FK_8c5ab5626ac98ea66b2e390250f" FOREIGN KEY ("user_type_id") REFERENCES "auth"."users_types"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "auth"."users" ADD CONSTRAINT "FK_5f4880fb7c7921e9a2692731ef2" FOREIGN KEY ("users_login_type_id") REFERENCES "auth"."users_login_types"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "auth"."users_groups_user" ADD CONSTRAINT "FK_06780db27a3e950c7e8d2f16d60" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "auth"."users_groups_user" ADD CONSTRAINT "FK_c2176d53abec72357fd438860b6" FOREIGN KEY ("user_group_id") REFERENCES "auth"."users_groups"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "auth"."users_groups_user" DROP CONSTRAINT "FK_c2176d53abec72357fd438860b6"`);
        await queryRunner.query(`ALTER TABLE "auth"."users_groups_user" DROP CONSTRAINT "FK_06780db27a3e950c7e8d2f16d60"`);
        await queryRunner.query(`ALTER TABLE "auth"."users" DROP CONSTRAINT "FK_5f4880fb7c7921e9a2692731ef2"`);
        await queryRunner.query(`ALTER TABLE "auth"."users_types_user" DROP CONSTRAINT "FK_8c5ab5626ac98ea66b2e390250f"`);
        await queryRunner.query(`ALTER TABLE "auth"."users_types_user" DROP CONSTRAINT "FK_d428b3f61a21867030c20399092"`);
        await queryRunner.query(`DROP TABLE "auth"."users_groups_user"`);
        await queryRunner.query(`DROP TABLE "auth"."users_groups"`);
        await queryRunner.query(`DROP TABLE "auth"."users"`);
        await queryRunner.query(`DROP TABLE "auth"."users_login_types"`);
        await queryRunner.query(`DROP TABLE "auth"."users_types_user"`);
        await queryRunner.query(`DROP TABLE "auth"."users_types"`);
    }
}
