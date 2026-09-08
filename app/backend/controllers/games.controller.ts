import { Request, Response } from 'express';
import { AppDataSource } from '../database/data-source';

export const gamesController = {
    getWord: async (req: Request, res: Response) => {
        // Implement the logic to get a word for the game
    },
    pushWord: async (req: Request, res: Response) => {
        // Implement the logic to push a word for the game in the Database
    },
    checkLetter: async (req: Request, res: Response) => {
        // Implement the logic to check if a letter corresponds to the word in the current game
    }

}