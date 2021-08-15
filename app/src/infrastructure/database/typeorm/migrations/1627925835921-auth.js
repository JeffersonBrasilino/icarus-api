const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class auth1627925835921 {
    name = 'auth1627925835921'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "auth"."api_routes_applications" DROP CONSTRAINT "FK_7aaa7bb3b5dd51ffee502a8ba70"`);
        await queryRunner.query(`ALTER TABLE "auth"."api_routes_applications" RENAME COLUMN "apllication_id" TO "application_id"`);
        await queryRunner.query(`ALTER TABLE "auth"."api_routes_applications" ADD CONSTRAINT "FK_f9cf9ec1eddda5cc800ea25aa8e" FOREIGN KEY ("application_id") REFERENCES "auth"."applications"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "auth"."api_routes_applications" DROP CONSTRAINT "FK_f9cf9ec1eddda5cc800ea25aa8e"`);
        await queryRunner.query(`ALTER TABLE "auth"."api_routes_applications" RENAME COLUMN "application_id" TO "apllication_id"`);
        await queryRunner.query(`ALTER TABLE "auth"."api_routes_applications" ADD CONSTRAINT "FK_7aaa7bb3b5dd51ffee502a8ba70" FOREIGN KEY ("apllication_id") REFERENCES "auth"."applications"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
}
