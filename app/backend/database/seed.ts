import "reflect-metadata"
import { AppDataSource } from "./data-source.ts"
import { seedWordOfTheDay } from "./seeders/wordOfTheDay.seeder.ts"

async function seed() {
    try {
        console.log("Connection to database...")
        if (!AppDataSource.isInitialized) {
            await AppDataSource.initialize()
        }
        console.log("Connected to database!")

        console.log("Creating one word of the day...")
        await seedWordOfTheDay(AppDataSource)
        console.log("Word of the day saved successfuly!")

    } catch (error) {
        console.log("Error while seeding : ", error)
    } finally {
        if (AppDataSource.isInitialized) {
            await AppDataSource.destroy()
        }
        console.log("Database connection closed.")
    }
}

seed()
