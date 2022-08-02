import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUsuarios1655774901621 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "usuarios",
                columns: [{
                    name: "id",
                    type: "uuid",
                    isPrimary: true
                },
                {
                    name: "nome",
                    type: "varchar"
                },
                {
                    name: "user_name",
                    type: "varchar",
                    isUnique: true
                },
                {
                    name: "senha",
                    type: "varchar"
                },
                {
                    name: "email",
                    type: "varchar"
                },
                {
                    name: "licenca_direcao",
                    type: "varchar"
                },
                {
                    name: "is_admin",
                    type: "boolean",
                    default: "false"
                },
                {
                    name: "created_at",
                    type: "timestamp",
                    default: "now()"
                }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("usuarios")
    }

}
