import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreatEspecificacoesCarros1666115327427 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "especificacoes_carros",
                columns: [{
                    name: "carro_id",
                    type: "uuid"
                },
                {
                    name: "especificacao_id",
                    type: "uuid"
                },
                {
                    name: "created_at",
                    type: "timestamp",
                    default: "now()"
                }
                ],
                foreignKeys: [
                    {
                        name: "FKEspecificacaoCarro",
                        referencedTableName: "especificacoes",
                        referencedColumnNames: ["id"],
                        columnNames: ["especificacao_id"],
                        onDelete: "SET NULL",
                        onUpdate: "SET NULL"
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("especificacoes_carros")
    }

}
