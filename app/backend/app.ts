import express, { type Express, type Request, type Response } from 'express';
import { AppDataSource } from './database/data-source.ts';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { readFileSync } from 'node:fs';

import gamesRoutes from './routes/games.routes.ts';
import statsRoutes from './routes/stats.routes.ts';

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

if (process.argv[1] === fileURLToPath(import.meta.url)) {
	const pkg = JSON.parse(
		readFileSync(join(import.meta.dirname, "package.json"), "utf-8"),
	);
	const port = Number(process.env.PORT) || 3000;
	const app = createApp();

	AppDataSource.initialize()
		.then(() => {
			app.listen(port, () => {
				console.log(
					`Server ${pkg.name}@${pkg.version} (${process.env.NODE_ENV ?? "development"}) is running on http://localhost:${port}`,
				);
			});
		})
		.catch((err) => {
			console.error("Error during Data Source initialization:", err);
		});
}