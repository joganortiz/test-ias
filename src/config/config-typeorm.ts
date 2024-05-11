import { ConfigModule, ConfigService } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';

ConfigModule.forRoot({
  envFilePath: '.env',
});

const configEnv = new ConfigService();

export const dataSourceOption: DataSourceOptions = {
  type: 'mysql',
  host: configEnv.get('MYSQL_DB_HOST'),
  username: configEnv.get('MYSQL_DB_USER'),
  password: configEnv.get('MYSQL_DB_PASSWORD'),
  database: configEnv.get('MYSQL_DB_NAME'),
  port: configEnv.get('MYSQL_DB_PORT'),
  entities: [
    __dirname + `/../contexts/**/**/infrastructura/sql/*.entity{.ts,.js}`,
  ],
  migrations: [__dirname + `/../migrations/*{.ts,.js}`],
  synchronize: false,
  migrationsRun: true,
  logging: false,
};

const dataSource: DataSource = new DataSource(dataSourceOption);

export default dataSource;
