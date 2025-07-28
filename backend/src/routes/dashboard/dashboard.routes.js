import Router from 'express';
import { dashboardController } from '../../controllers/dashboard/dashboard.controllers.js';

const router = Router();

router.route('/:userId').get(dashboardController);

export default router;
