import { DataSource } from "typeorm";
import { ConfigService } from "@nestjs/config";
import { resolve } from "path";
import { config } from "dotenv";
config({ path: "../.env" });

const configService = new ConfigService();
const dataSource = new DataSource({
    type: "postgres",
    host: configService.get<string>("TYPEORM_POSTS_HOST"),
    port: configService.get<number>("TYPEORM_POSTS_PORT"),
    username: configService.get<string>("TYPEORM_POSTS_USERNAME"),
    password: configService.get<string>("TYPEORM_POSTS_PASSWORD"),
    database: configService.get<string>("TYPEORM_POSTS_DATABASE"),
    synchronize: false,
    entities: [resolve(__dirname, "..", "**", "**", "*.entity.js")],
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