import { Router } from 'express';
import { gamesController } from '../controllers/games.controller.ts';

const router = Router();

// Get
router.get('/word', gamesController.getWord);

// Post
router.post('/word', gamesController.pushWord);
router.post('/check-letter', gamesController.checkLetter);

export default router;