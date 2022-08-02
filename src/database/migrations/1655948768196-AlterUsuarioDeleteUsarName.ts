import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AlterUsuarioDeleteUsarName1655948768196 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("usuarios", "user_name")
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn("usuarios", new TableColumn({
            name: "user_name",
            type: "varchar"
        }))
    }

}
