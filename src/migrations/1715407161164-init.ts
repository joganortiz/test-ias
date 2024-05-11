import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1715407161164 implements MigrationInterface {
    name = 'Init1715407161164'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`food\` (\`_id\` varchar(36) NOT NULL, \`name\` varchar(55) NOT NULL, UNIQUE INDEX \`IDX_0f9580637d3bcdd0c9d6558de0\` (\`name\`), PRIMARY KEY (\`_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`recipes\` (\`_id\` varchar(36) NOT NULL, \`name\` varchar(55) NOT NULL, \`description\` longtext NOT NULL, \`difficulty\` enum ('easy', 'half', 'difficult') NOT NULL DEFAULT 'half', \`food_id\` varchar(36) NULL, PRIMARY KEY (\`_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`recipes\` ADD CONSTRAINT \`fk_recipes_food\` FOREIGN KEY (\`food_id\`) REFERENCES \`food\`(\`_id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`recipes\` DROP FOREIGN KEY \`fk_recipes_food\``);
        await queryRunner.query(`DROP TABLE \`recipes\``);
        await queryRunner.query(`DROP INDEX \`IDX_0f9580637d3bcdd0c9d6558de0\` ON \`food\``);
        await queryRunner.query(`DROP TABLE \`food\``);
    }

}
