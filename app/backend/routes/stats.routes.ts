import { Router } from 'express';
import { statsController } from '../controllers/stats.controller';

const router = Router();

// Get 
router.get('/stats', statsController.getStats);

// Post
router.post('/stats', statsController.pushStats);

export default router;