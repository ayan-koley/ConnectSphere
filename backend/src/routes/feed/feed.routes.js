import Router from 'express';
import { IP } from '../../middlewares/location.middlewares.js';
import { getSuggestedUsers, globalFeed } from '../../controllers/feed/feed.controllers.js';
import { requiredAuth } from '../../middlewares/requiredAuth.js';

const router = Router();

router.route("/").get(IP, globalFeed);
router.route("/user").get(requiredAuth, getSuggestedUsers);

export default router;