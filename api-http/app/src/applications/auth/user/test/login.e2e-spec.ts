import {INestApplication, ValidationPipe} from "@nestjs/common";
import * as request from 'supertest';
import {Test, TestingModule} from "@nestjs/testing";
import {AuthModule} from "@applications/auth/auth.module";

let app: INestApplication;
const mockUsersRepo = {
    getUserLogin: (username: string) => {
        if (username == 'jefferson.brasilino')
            return {id: '9999', password: '$2b$10$LZXEY.1P75qJMqdPf6HWHea1Z7hPI04UIVEiKuuE9ph5BJd/wWywC'};
        else
            return null;
    },
    save:(data:any)=>{
      return {id: 3};
    },
    findUserToRecoveryPassword: (username: any) => {
        if (username == 'jefferson.brasilino') {
            return {id: 3, personId: {contacts: [{description: 'jefferson.brasilino@a7participacoes.com'}]}}
        } else if (username == 'invalidEmail') {
            return {id: 3, personId: {contacts: [{description: 'teste@teste'}]}}
        } else if (username == 'failedSendEmail') {
            return {id: 3, personId: {contacts: [{description: 'failedSendEmail@7participacoes.com'}]}}
        } else {
            return null;
        }
    }
};
const mockEmailService = {
    sendEmail: (opt) => {
        if (opt.to == 'jefferson.brasilino@a7participacoes.com')
            return {success: true, response: 'ok'};
        else
            return {success: false, response: 'dont ok'};
    }
}

beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AuthModule],
        })
            .overrideProvider('IUsersRepository')
            .useValue(mockUsersRepo)
            .overrideProvider('ISendEmailProvider')
            .useValue(mockEmailService)
            .compile();

        app = moduleFixture.createNestApplication();
        app.useGlobalPipes(new ValidationPipe());
        await app.init();

    }
)
;

describe('/auth/login (e2e)', () => {

    it(`quando user e senha for CORRETOS retorna o token`, () => {
        return request(app.getHttpServer())
            .post('/auth/login')
            .send({
                username: "jefferson.brasilino",
                password: '123456',
                applicationId: 'hue'
            })
            .set('Accept', 'application/json')
            .expect(200);
    });

    it('quando o usuario não existir, retorna 404', () => {
        return request(app.getHttpServer())
            .post('/auth/login')
            .send({username: "jefferson.brasilin", password: '123456', applicationId: 'hue'})
            .set('Accept', 'application/json')
            .expect(400)
            .expect((res) => {
                expect(Object.keys(res.body)).toEqual(['status', 'data']);
            })
    })

    it('quando o usuario existir e a senha for INCORRETA, retorna 400', () => {
        return request(app.getHttpServer())
            .post('/auth/login')
            .send({username: "jefferson.brasilino", password: '12345', applicationId: 'hue'})
            .expect(400)
            .expect((res) => {
                expect(Object.keys(res.body)).toEqual(['status', 'data']);
            })
    })

    it('quando tentar logar sem usuario e senha e sem applicationId, retorna 400', () => {
        return request(app.getHttpServer())
            .post('/auth/login')
            .send({})
            .set('Accept', 'application/json')
            .expect(400)
    })

    it('quando tentar logar sem usuario e sem senha COM applicationId, retorna 400', () => {
        return request(app.getHttpServer())
            .post('/auth/login')
            .expect(400)
            .send({
                // username: "jefferson.brasilino",
                // password: '123456',
                applicationId: 'hue'
            })
            .set('Accept', 'application/json')
    })

    it('quando tentar logar  usuario e senha COM applicationId, retorna 400', () => {
        return request(app.getHttpServer())
            .post('/auth/login')
            .expect(400)
            .send({
                username: "jefferson.brasilino",
                password: '123456',
                //applicationId: 'hue'
            })
            .set('Accept', 'application/json')
    })

    it('quando tentar recuperar a senha sem usuário, retorna 400', () => {
        return request(app.getHttpServer())
            .post('/auth/send-code-recovery-password')
            .expect(400)
            .set('Accept', 'application/json')
    })

    it('quando tentar recuperar a senha com usuário invalido, retorna 404', () => {
        return request(app.getHttpServer())
            .post('/auth/send-code-recovery-password')
            .expect(404)
            .send({
                username: "jefferson.brasili",
            })
            .set('Accept', 'application/json')
    })

    it('quando tentar recuperar a senha com usuário valido, mas email inválido, retorna 422', () => {
        return request(app.getHttpServer())
            .post('/auth/send-code-recovery-password')
            .expect(422)
            .send({
                username: "invalidEmail",
            })
            .set('Accept', 'application/json')
    })

    it('quando tentar recuperar a senha com usuário valido e email valido, mas o email falha, retorna 424', () => {
        return request(app.getHttpServer())
            .post('/auth/send-code-recovery-password')
            .expect(424)
            .send({
                username: "failedSendEmail",
            })
            .set('Accept', 'application/json')
    })

    it('quando tentar recuperar a senha com usuário valido, email valido e o email for realizado, retorna 200', () => {
        return request(app.getHttpServer())
            .post('/auth/send-code-recovery-password')
            .expect(200)
            .send({
                username: "jefferson.brasilino",
            })
            .set('Accept', 'application/json')
    })
});
afterAll(async () => {
    await app.close();
});
