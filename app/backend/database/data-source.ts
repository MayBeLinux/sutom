import "reflect-metadata"
import { DataSource } from "typeorm"
import { join } from "node:path"
import { env } from "../configs/env.ts"
import { WordOfTheDay } from "../entities/wordOfTheDay.entity.ts"
import { DayStats } from "../entities/dayStats.entity.ts"

dotenv.config({ path: path.resolve(import.meta.dirname, "../../../.env") })

export const AppDataSource = new DataSource({
    type: "postgres",
    host: env.dbHost,
    port: Number(env.dbPort ?? 5432),
    username: env.dbUser,
    password: env.dbPassword,
    database: env.dbName,
    entities: [join(import.meta.dirname, "../entities/**/*{.js,.ts}")],
    migrations: [join(import.meta.dirname, "migrations/**/*{.js,.ts}")],
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT ?? 5432),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [WordOfTheDay, DayStats],
    migrations: [path.join(import.meta.dirname, "../migrations/**/*.{js,ts}")],
    synchronize: false,
})
