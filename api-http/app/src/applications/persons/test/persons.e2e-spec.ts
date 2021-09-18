import * as request from "supertest";
import {INestApplication, ValidationPipe} from "@nestjs/common";
import {Test, TestingModule} from "@nestjs/testing";
import {PersonsModule} from "@applications//persons/persons.module";

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
            return null;
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

//dados do GET E POST
const requestData = {};

beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
        imports: [PersonsModule],
    })
        //.overrideProvider('IUsersRepository') //para mockar os repositorios usar isso, eis o ex.
        //.useValue(mockRepo)
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

describe('LIST //persons (e2e)', () => {
    it(`quando acessar a LISTAGEM, listar e retornar 200`, () => {
        return request(app.getHttpServer())
            .get('//persons')
            .set('Authorization', `Bearer ${token}`)
            .set('Accept', 'application/json')
            .expect(200)
    });

    it(`quando acessar a LISTAGEM com filtros que nao existem registro, retornar 404`, () => {
        return request(app.getHttpServer())
            .get('//persons?username=aquiebr')
            .set('Authorization', `Bearer ${token}`)
            .set('Accept', 'application/json')
            .expect(404)
    });
})

describe('GET users (e2e)', () => {
    it(`quando acessar um id que existe , retornar 200`, () => {
        return request(app.getHttpServer())
            .get('//persons/3')
            .set('Authorization', `Bearer ${token}`)
            .set('Accept', 'application/json')
            .expect(200)
            .expect((res) => {
                expect(Object.keys(res.body)).toEqual(['status', 'data']);
            })
    });

    it(`quando acessar um id NÃO que existe , retornar 404`, () => {
        return request(app.getHttpServer())
            .get('//persons/123584128486521')
            .set('Authorization', `Bearer ${token}`)
            .set('Accept', 'application/json')
            .expect(404)
            .expect((res) => {
                expect(Object.keys(res.body)).toEqual(['status', 'data']);
            })
    });
});

describe('SAVE //persons (e2e)', () => {
    it('quando tentar salvar os dados com dados enviados, retorna 201', () => {
        return request(app.getHttpServer())
            .post('//persons')
            .send(requestData)
            .set('Authorization', `Bearer ${token}`)
            .set('Accept', 'application/json')
            .expect(201)
            .expect((res) => {
                expect(Object.keys(res.body)).toEqual(['status', 'data']);
            })
    });

    it('quando tentar salvar sem dados enviados retorna 400', () => {
        return request(app.getHttpServer())
            .post('//persons')
            .set('Authorization', `Bearer ${token}`)
            .set('Accept', 'application/json')
            .expect(400)
    })
});

describe('UPDATE //persons (e2e)', () => {
    it('quando tentar atualizar os dados com dados enviados, retorna 200', () => {
        return request(app.getHttpServer())
            .put('//persons/3')
            .send(requestData)
            .set('Authorization', `Bearer ${token}`)
            .set('Accept', 'application/json')
            .expect(200)
            .expect((res) => {
                expect(Object.keys(res.body)).toEqual(['status', 'data']);
            })
    });

    it('quando tentar atualizar sem dados enviados retorna 400', () => {
        return request(app.getHttpServer())
            .put('//persons/3')
            .set('Authorization', `Bearer ${token}`)
            .set('Accept', 'application/json')
            .expect(400)
    });

    it('quando tentar atualizar com dados enviados e sem ID retorna 404', () => {
        return request(app.getHttpServer())
            .put('//persons')
            .set('Authorization', `Bearer ${token}`)
            .set('Accept', 'application/json')
            .expect(404)
    })
});

describe('DELETE //persons (e2e)', () => {
    it('quando tentar deletar com ID, retorna 200', () => {
        return request(app.getHttpServer())
            .delete('//persons/3')
            .set('Authorization', `Bearer ${token}`)
            .set('Accept', 'application/json')
            .expect(200)
            .expect((res) => {
                expect(Object.keys(res.body)).toEqual(['status', 'data']);
            })
    });

    it('quando tentar deletar sem ID, retorna 404', () => {
        return request(app.getHttpServer())
            .delete('//persons')
            .set('Authorization', `Bearer ${token}`)
            .set('Accept', 'application/json')
            .expect(404)
    });
});


afterAll(async () => {
    await app.close();
});
