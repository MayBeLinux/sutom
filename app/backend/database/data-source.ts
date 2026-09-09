import "reflect-metadata"
import { DataSource } from "typeorm"
import { join } from "node:path"
import { env } from "../configs/env.ts"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: env.dbHost,
    port: Number(env.dbPort ?? 5432),
    username: env.dbUser,
    password: env.dbPassword,
    database: env.dbName,
    entities: [join(import.meta.dirname, "../entities/**/*{.js,.ts}")],
    migrations: [join(import.meta.dirname, "migrations/**/*{.js,.ts}")],
    synchronize: false,
})
