import * as request from "supertest";
import {INestApplication, ValidationPipe} from "@nestjs/common";
import {Test, TestingModule} from "@nestjs/testing";
import {UsersGroupsModule} from "@applications/administration/users-groups/users-groups.module";

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
        return {id: 999999};
    },
    delete: (id) => {
        if (id == 3)
            return {affected: 1}
        else
            return {affected: 0}
    }
};

beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
        imports: [UsersGroupsModule],
    })
        .overrideProvider('IUsersGroupsRepository')
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
            .get('/administration/users-groups')
            .set('Authorization', `Bearer ${token}`)
            .set('Accept', 'application/json')
            .expect(200)
    });

    it(`quando acessar a LISTAGEM com filtros que nao existem registro, retornar 404`, () => {
        return request(app.getHttpServer())
            .get('/administration/users-groups?username=aquiebr')
            .set('Authorization', `Bearer ${token}`)
            .set('Accept', 'application/json')
            .expect(404)
    });
})

describe('GET users (e2e)', () => {
    it(`quando acessar um id que existe , retornar 200`, () => {
        return request(app.getHttpServer())
            .get('/administration/users-groups/3')
            .set('Authorization', `Bearer ${token}`)
            .set('Accept', 'application/json')
            .expect(200)
            .expect((res) => {
                expect(Object.keys(res.body)).toEqual(['status', 'data']);
            })
    });

    it(`quando acessar um id N??O que existe , retornar 404`, () => {
        return request(app.getHttpServer())
            .get('/administration/users-groups/123584128486521')
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
            .post('/administration/users-groups')
            .send({
                name: "teste 2",
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
            .post('/administration/users-groups')
            .set('Authorization', `Bearer ${token}`)
            .set('Accept', 'application/json')
            .expect(400)
    })
});

describe('UPDATE users(e2e)', () => {
    it('quando tentar atualizar os dados com dados enviados, retorna 200', () => {
        return request(app.getHttpServer())
            .put('/administration/users-groups/3')
            .send({
                name: "teste 2",
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
            .put('/administration/users-groups/3')
            .set('Authorization', `Bearer ${token}`)
            .set('Accept', 'application/json')
            .expect(400)
    });

    it('quando tentar atualizar com dados enviados e sem ID retorna 404', () => {
        return request(app.getHttpServer())
            .put('/administration/users-groups')
            .set('Authorization', `Bearer ${token}`)
            .set('Accept', 'application/json')
            .expect(404)
    })
});

describe('DELETE users(e2e)', () => {
    it('quando tentar deletar com ID, retorna 200', () => {
        return request(app.getHttpServer())
            .delete('/administration/users-groups/3')
            .set('Authorization', `Bearer ${token}`)
            .set('Accept', 'application/json')
            .expect(200)
            .expect((res) => {
                expect(Object.keys(res.body)).toEqual(['status', 'data']);
            })
    });

    it('quando tentar deletar sem ID, retorna 404', () => {
        return request(app.getHttpServer())
            .delete('/administration/users-groups')
            .set('Authorization', `Bearer ${token}`)
            .set('Accept', 'application/json')
            .expect(404)
    });
});


afterAll(async () => {
    await app.close();
});
