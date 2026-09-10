import express, { type Express, type Request, type Response } from 'express';
import { AppDataSource } from './database/data-source.ts';
import { env } from './configs/env.ts';

import gamesRoutes from './routes/games.routes.ts';
import statsRoutes from './routes/stats.routes.ts';

const DEFAULT_PORT = 3000;

export const createApp = (): Express => {
    const app: Express = express();

    app.use(express.json());

    app.use('/api/games', gamesRoutes);
    app.use('/api/stats', statsRoutes);

    app.get('/', (req: Request, res: Response) => {
        res.send('Welcome to the Sutom API');
    });

    return app;
};

// Code executend only when running "npm run dev"
if (process.argv[1]?.endsWith('app.ts')) {
	const port = Number(env.port) || DEFAULT_PORT;
	const app = createApp();

	try {
		// DB connextion
		await AppDataSource.initialize();
		console.log('Connected to database');

		// Express start
		app.listen(port, () => {
			console.log(`Server started at http://localhost:${port}`);
		});
	} catch (error) {
		console.error("Can't connect to database.");
		console.error('Tip : did you run "docker compose up -d" ?');
		console.error(error);
		process.exit(1);
	}
}