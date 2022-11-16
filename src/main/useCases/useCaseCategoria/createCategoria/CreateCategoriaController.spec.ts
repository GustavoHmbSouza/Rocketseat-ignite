import { hash } from 'bcryptjs';
import request from 'supertest';
import { Connection, createConnection } from 'typeorm';
import { app } from '../../../../shared/infra/http/app';
import { v4 as uuidV4 } from 'uuid';

let connection: Connection;

describe("Create Categoria Controller", () => {

    beforeAll(async () => {
        connection = await createConnection();
        await connection.runMigrations();

        const id = uuidV4();
        const password = await hash("admin", 8);

        await connection.query(
            `INSERT INTO USUARIOS(id, nome, email, senha, "is_admin", created_at, licenca_direcao)
            values('${id}', 'admin', 'admin@admin.com', '${password}', true, 'now()', 'XXXX' )`
        )
    });

    afterAll(async () => {
        await connection.dropDatabase();
        await connection.close();
    })

    it("Deve criar uma nova categoria", async () => {
        const responseToken = await request(app).post("/sessions")
            .send({
                email: "admin@admin.com",
                senha: "admin"
            })

        const { token } = responseToken.body;

        const response = await request(app)
            .post("/categorias")
            .send({
                nome: "Nome Teste",
                descricao: "Categoria Teste"
            })
            .set({
                Authorization: `Bearer ${token}`
            });

        expect(response.status).toBe(201);
    });

    it("Não deve criar uma nova categoria por já existir uma", async () => {
        const responseToken = await request(app).post("/sessions")
            .send({
                email: "admin@admin.com",
                senha: "admin"
            })

        const { token } = responseToken.body;

        const response = await request(app)
            .post("/categorias")
            .send({
                nome: "Nome Teste",
                descricao: "Categoria Teste"
            })
            .set({
                Authorization: `Bearer ${token}`
            });

        expect(response.status).toBe(400);
    })
})