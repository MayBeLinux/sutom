import dotenv from "dotenv"
import { join } from "node:path"

// Load .env file at the root of the project
dotenv.config({ path: join(import.meta.dirname, "../../../.env") })

export const env = {
    port: Number(process.env.PORT ?? 3000),
    dbHost: process.env.DB_HOST ?? "localhost",
    dbPort: Number(process.env.DB_PORT ?? 5432),
    dbUser: process.env.DB_USER ?? "sutom_user",
    dbPassword: process.env.DB_PASSWORD ?? "",
    dbName: process.env.DB_NAME ?? "sutom",
}