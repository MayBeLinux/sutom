import { Between, DataSource } from "typeorm";
import { WordOfTheDay } from "../../entities/wordOfTheDay.entity.ts";

export async function seedWordOfTheDay(dataSource: DataSource): Promise<WordOfTheDay[]> {
    const repo = dataSource.getRepository(WordOfTheDay)
    const word = "MAISON"

    const startOfDay = new Date()
    startOfDay.setHours(0, 0, 0, 0)
    const endOfDay = new Date()
    endOfDay.setHours(23, 59, 59, 999)

    const alreadyExists = await repo.existsBy({ date: Between(startOfDay, endOfDay) })

    if (!alreadyExists) {
        const entry = repo.create({ word, date: new Date() })
        await repo.save(entry)
    }

    return repo.find({ where: { date: Between(startOfDay, endOfDay) } })
}
