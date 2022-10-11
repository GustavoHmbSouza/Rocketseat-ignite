import { v4 as uuidV4 } from 'uuid';
import { hash } from "bcryptjs";
import createConnection from '../index';

async function create() {
    const connection = await createConnection("localhost");

    const id = uuidV4();
    const password = await hash("admin", 8);

    await connection.query(
        `INSERT INTO USUARIOS(id, nome, email, senha, "is_admin", created_at, licenca_direcao)
        values('${id}', 'admin', 'admin@admin.com', '${password}', true, 'now()', 'XXXX' )`
    )

    await connection.close;
}

create().then(() => console.log('Usuario admin criado'))
