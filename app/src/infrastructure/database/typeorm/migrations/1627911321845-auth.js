const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class auth1627911321845 {
    name = 'auth1627911321845'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "auth"."users" DROP CONSTRAINT "FK_5f4880fb7c7921e9a2692731ef2"`);
        await queryRunner.query(`ALTER TABLE "auth"."users" ALTER COLUMN "person_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "auth"."users" ALTER COLUMN "verification_code" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "auth"."users" ALTER COLUMN "users_login_type_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "auth"."users" ADD CONSTRAINT "FK_5f4880fb7c7921e9a2692731ef2" FOREIGN KEY ("users_login_type_id") REFERENCES "auth"."users_login_types"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "auth"."users" DROP CONSTRAINT "FK_5f4880fb7c7921e9a2692731ef2"`);
        await queryRunner.query(`ALTER TABLE "auth"."users" ALTER COLUMN "users_login_type_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "auth"."users" ALTER COLUMN "verification_code" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "auth"."users" ALTER COLUMN "person_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "auth"."users" ADD CONSTRAINT "FK_5f4880fb7c7921e9a2692731ef2" FOREIGN KEY ("users_login_type_id") REFERENCES "auth"."users_login_types"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
}
