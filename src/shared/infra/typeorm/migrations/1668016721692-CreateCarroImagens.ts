import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateCarroImagens1668016721692 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "carro_imagens",
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
                    name: "imagem_nome",
                    type: "varchar"
                },
                {
                    name: "created_at",
                    type: "timestamp",
                    default: "now()"
                }
                ],
                foreignKeys: [
                    {
                        name: "FKCarroImagens",
                        referencedTableName: "carros",
                        referencedColumnNames: ["id"],
                        columnNames: ["carro_id"],
                        onDelete: "SET NULL",
                        onUpdate: "SET NULL"
                    }
                ],
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("carro_imagens")
    }

}
