import { Request, Response } from 'express';
import { GameService } from '../services/game.service.ts';

export const gamesController = {
    getWord: async (req: Request, res: Response) => {
        try {
        const gameService = new GameService();
        const word = await gameService.fetchWord();
        res.status(200).json({ word });
        } catch (error) {
            return res.status(500).json({message: (error as Error).message});
        }


    },
    pushWord: async (req: Request, res: Response) => {
        // Implement the logic to push a word for the game in the Database
    },
    checkLetter: async (req: Request, res: Response) => {
        // Implement the logic to check if a letter corresponds to the word in the current game
    }


}