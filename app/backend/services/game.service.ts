import { DataSource } from 'typeorm';
import { AppDataSource } from '../database/data-source.ts';
import { WordOfTheDay } from '../entities/wordOfTheDay.entity.ts';

interface Wind {
    current_weather: {
        windspeed: number;
    };
}

export class GameService {
    private static dailyCache: { date: string; word: WordOfTheDay | null } | null = null;

    async fetchWord() {
        const today = new Date().toISOString().slice(0, 10);

        if (GameService.dailyCache?.date === today) {
            return GameService.dailyCache.word;
        }

        const windData = await this.getWindData(48.132270649205786, -1.6924084184199777);
        const randomWind: number = Math.round(windData ?? 0);
        const word = AppDataSource.getRepository(WordOfTheDay);

        const picked = await word.findOne({
            where: { id: randomWind },
        });

        GameService.dailyCache = { date: today, word: picked };
        return picked;
    }

    async getWindData(lat: number, lon: number) {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Failed to fetch wind data');
            }

            const data = await response.json() as Wind;
            return data.current_weather?.windspeed ?? null;
        } catch (error) {
            console.error('Error fetching wind data:', error);
            return null;
        }
    }

    async checkLetter(key: string) {

    }
}