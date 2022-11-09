import { MigrationInterface, QueryRunner, Table } from "typeorm";
import { ForeignKeyMetadata } from "typeorm/metadata/ForeignKeyMetadata";

export class CreateCarro1663722233561 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "carros",
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
                    name: "descricao",
                    type: "varchar"
                },
                {
                    name: "dia_rate",
                    type: "numeric"
                },
                {
                    name: "available",
                    type: "boolean",
                    default: true
                },
                {
                    name: "placa",
                    type: "varchar"
                },
                {
                    name: "valor_multa",
                    type: "numeric"
                },
                {
                    name: "marca",
                    type: "varchar"
                },
                {
                    name: "categoria_id",
                    type: "uuid",
                    isNullable: true
                },
                {
                    name: "created_at",
                    type: "timestamp",
                    default: "now()"
                }
                ],
                foreignKeys: [
                    {
                        name: "FKCategoriaCarro",
                        referencedTableName: "categorias",
                        referencedColumnNames: ["id"],
                        columnNames: ["categoria_id"],
                        onDelete: "SET NULL",
                        onUpdate: "SET NULL"
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("carros")
    }

}
