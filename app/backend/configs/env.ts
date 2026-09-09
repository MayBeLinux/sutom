import dotenv from "dotenv"
import { join } from "node:path"

dotenv.config({ path: join(import.meta.dirname, "../../../.env") })

export const env = {
    dbHost: process.env.DB_HOST,
    dbPort: Number(process.env.DB_PORT ?? 5432),
    dbUser:process.env.DB_USER,
    dbPassword: process.env.DB_PASSWORD,
    dbName: process.env.DB_NAME,
}