import * as request from "supertest";
import {INestApplication, ValidationPipe} from "@nestjs/common";
import {Test, TestingModule} from "@nestjs/testing";
import {IndexModule} from "@applications/administration/companies/index/index.module";

let app: INestApplication;
let token!: string;
const mockRepo = {
    list: (page, filter) => {
        if (filter.username == 'aquiebr')
            return {rows: null};
        else
            return {rows: [1, 2]};
    },
    get: (id) => {
        if (id == 3) {
            return ['hue'];
        } else {
            return [];
        }
    },
    save: (dados, id) => {
        if (id == 2546546540)
            return {id: null}
        else
            return {id: 999999};
    },
    delete: (id) => {
        if (id == 3)
            return {affected: 1}
        else
            return {affected: 0}
    },
    getCompanyWithSectors: (id) => {
        return {
            companySectors: [
                {"description": "setor 1"},
                {"description": "setor 2"},
                {"description": "setor 3"},
                {"description": "setor 4"},
                {"description": "setor 5"}
            ]
        }
    }
};

beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
        imports: [IndexModule],
    })
        .overrideProvider('ICompaniesRepository') //para mockar os repositorios usar isso, eis o ex.
        .useValue(mockRepo)
        .compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();

    //login para as rotas autenticadas
    const login = await request(app.getHttpServer())
        .post('/auth/login')
        .send({
            username: "jefferson.brasilino",
            password: '123456',
            applicationId: 'hue'
        });
    token = login.body.data;

});

describe('LIST users (e2e)', () => {
    it(`quando acessar a LISTAGEM, listar e retornar 200`, () => {
        return request(app.getHttpServer())
            .get('/administration/companies/index')
            .set('Authorization', `Bearer ${token}`)
            .set('Accept', 'application/json')
            .expect(200)
    });

    it(`quando acessar a LISTAGEM com filtros que nao existem registro, retornar 404`, () => {
        return request(app.getHttpServer())
            .get('/administration/companies/index?username=aquiebr')
            .set('Authorization', `Bearer ${token}`)
            .set('Accept', 'application/json')
            .expect(404)
    });
})

describe('GET users (e2e)', () => {
    it(`quando acessar um id que existe , retornar 200`, () => {
        return request(app.getHttpServer())
            .get('/administration/companies/index/3')
            .set('Authorization', `Bearer ${token}`)
            .set('Accept', 'application/json')
            .expect(200)
            .expect((res) => {
                expect(Object.keys(res.body)).toEqual(['status', 'data']);
            })
    });

    it(`quando acessar um id NÃO que existe , retornar 404`, () => {
        return request(app.getHttpServer())
            .get('/administration/companies/index/123584128486521')
            .set('Authorization', `Bearer ${token}`)
            .set('Accept', 'application/json')
            .expect(404)
            .expect((res) => {
                expect(Object.keys(res.body)).toEqual(['status', 'data']);
            })
    });
});

describe('SAVE users(e2e)', () => {
    it('quando tentar salvar os dados com dados enviados, retorna 201', () => {
        return request(app.getHttpServer())
            .post('/administration/companies/index')
            .send({
                "name": "teste empresa",
                "companyGroup": 1,
                "companyType": 1,
                "companySectors": [
                    {"description": "setor 1"},
                    {"description": "setor 2"},
                    {"description": "setor 3"},
                    {"description": "setor 4"},
                    {"description": "setor 5"}
                ]
            })
            .set('Authorization', `Bearer ${token}`)
            .set('Accept', 'application/json')
            .expect(201)
            .expect((res) => {
                expect(Object.keys(res.body)).toEqual(['status', 'data']);
            })
    });

    it('quando tentar salvar sem dados enviados retorna 400', () => {
        return request(app.getHttpServer())
            .post('/administration/companies/index')
            .set('Authorization', `Bearer ${token}`)
            .set('Accept', 'application/json')
            .expect(400)
    })
});

describe('UPDATE users(e2e)', () => {
    it('quando tentar atualizar os dados com dados enviados, retorna 200', () => {
        return request(app.getHttpServer())
            .put('/administration/companies/index/3')
            .send({
                "name": "teste empresa",
                "companyGroup": 1,
                "companyType": 1,
                "companySectors": [
                    {"description": "setor 1"},
                    {"description": "setor 2"},
                    {"description": "setor 3"},
                    {"description": "setor 4"},
                    {"description": "setor 5"}
                ]
            })
            .set('Authorization', `Bearer ${token}`)
            .set('Accept', 'application/json')
            .expect(200)
            .expect((res) => {
                expect(Object.keys(res.body)).toEqual(['status', 'data']);
            })
    });

    it('quando tentar atualizar sem dados enviados retorna 400', () => {
        return request(app.getHttpServer())
            .put('/administration/companies/index/3')
            .set('Authorization', `Bearer ${token}`)
            .set('Accept', 'application/json')
            .expect(400)
    });

    it('quando tentar atualizar com dados enviados e sem ID retorna 404', () => {
        return request(app.getHttpServer())
            .put('/administration/companies/index')
            .set('Authorization', `Bearer ${token}`)
            .set('Accept', 'application/json')
            .expect(404)
    });
    it('quando tentar atualizar com dados enviados e ID que não existe retorna 404', () => {
        return request(app.getHttpServer())
            .put('/administration/companies/index/2546546540')
            .send({
                name: "teste empresa",
                companyGroup: 1,
                companyType: 1,
                companySectors: [
                    {description: "setor 1"},
                    {description: "setor 2"},
                    {description: "setor 3"},
                    {description: "setor 4"},
                    {description: "setor 5"}
                ]
            })
            .set('Authorization', `Bearer ${token}`)
            .set('Accept', 'application/json')
            .expect(404)
    });
});

describe('DELETE users(e2e)', () => {
    it('quando tentar deletar com ID, retorna 200', () => {
        return request(app.getHttpServer())
            .delete('/administration/companies/index/3')
            .set('Authorization', `Bearer ${token}`)
            .set('Accept', 'application/json')
            .expect(200)
            .expect((res) => {
                expect(Object.keys(res.body)).toEqual(['status', 'data']);
            })
    });

    it('quando tentar deletar sem ID, retorna 404', () => {
        return request(app.getHttpServer())
            .delete('/administration/index/companies')
            .set('Authorization', `Bearer ${token}`)
            .set('Accept', 'application/json')
            .expect(404)
    });
});


afterAll(async () => {
    await app.close();
});
