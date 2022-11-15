import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateAlugueis1668163333551 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "alugueis",
                columns: [{
                    name: "id",
                    type: "uuid",
                    isPrimary: true
                },
                {
                    name: "carro_id",
                    type: "uuid"
                },
                {
                    name: "usuario_id",
                    type: "uuid"
                },
                {
                    name: "tempo_inicial",
                    type: "timestamp",
                    default: "now()"
                },
                {
                    name: "tempo_final",
                    type: "timestamp",
                    isNullable: true,
                },
                {
                    name: "tempo_previsto_retorno",
                    type: "timestamp",
                },
                {
                    name: "total",
                    type: "numeric",
                    isNullable: true
                },
                {
                    name: "created_at",
                    type: "timestamp",
                    default: "now()"
                },
                {
                    name: "updated_at",
                    type: "timestamp",
                    default: "now()"
                }
                ],
                foreignKeys: [
                    {
                        name: "FKCarroAluguel",
                        referencedTableName: "carros",
                        referencedColumnNames: ["id"],
                        columnNames: ["carro_id"],
                        onDelete: "SET NULL",
                        onUpdate: "SET NULL"
                    },
                    {
                        name: "FKUsuarioAluguel",
                        referencedTableName: "usuarios",
                        referencedColumnNames: ["id"],
                        columnNames: ["usuario_id"],
                        onDelete: "SET NULL",
                        onUpdate: "SET NULL"
                    }
                ],
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("alugueis")
    }

}
