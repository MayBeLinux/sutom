import express, { type Express, type Request, type Response } from 'express';
import gamesRoutes from './routes/games.routes';
import statsRoutes from './routes/stats.routes';

export const createApp = (): Express => {
    const app: Express = express();

    app.use(express.json());

    app.use('/api/games', gamesRoutes);
    app.use('/api/stats', statsRoutes);

    app.get('/', (req: Request, res: Response) => {
        res.send('Welcome to the Sutom API');
    });

    return app;
}