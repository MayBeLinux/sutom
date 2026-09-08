import { Request, Response } from 'express';

export const statsController = {
    getStats: async (req: Request, res: Response) => {
        // Implement the logic to get stats for the current game
    },
    pushStats: async (req: Request, res: Response) => {
        // Implement the logic to push stats for the current game to make some calculus logic
    }
}