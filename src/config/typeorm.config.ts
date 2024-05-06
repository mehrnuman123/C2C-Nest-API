import { DataSource, DataSourceOptions } from 'typeorm';
export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'cardtogo_dev',
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/database/migrations/*.js'] ,
  synchronize: false,
};
const databaseSource = new DataSource(dataSourceOptions);
export default databaseSource;
