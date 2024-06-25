import { DataSource } from "typeorm";
import { ConfigService } from "@nestjs/config";
import { resolve } from "path";
import { config } from "dotenv";
config({ path: "../../.env" });

const configService = new ConfigService();
const dataSource = new DataSource({
    type: "postgres",
    host: configService.get<string>("FILES_DB_HOST"),
    port: configService.get<number>("FILES_DB_PORT"),
    username: configService.get<string>("FILES_DB_USERNAME"),
    password: configService.get<string>("FILES_DB_PASSWORD"),
    database: configService.get<string>("FILES_DB_DATABASE"),
    synchronize: false,
    entities: [resolve(__dirname, "..", "**", "**", "*.entity.ts")],
    migrations: [resolve(__dirname, "..", "migrations", "*.ts")],
    migrationsRun: false,
});

try {
    dataSource.initialize();
    console.log("DB is connected");
} catch (error) {
    console.error(error.message);
}

export default dataSource;