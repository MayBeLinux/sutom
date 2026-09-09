import "reflect-metadata"
import { DataSource } from "typeorm"
import { env } from "../configs/env.ts"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: env.dbHost,
    port: Number(env.dbPort ?? 5432),
    username: env.dbUser,
    password: env.dbPassword,
    database: env.dbName,
    entities: ["../entities/**/*{.js,.ts}"],
    migrations: ["../migrations/**/*{.js,.ts}"],
    synchronize: false,
})
