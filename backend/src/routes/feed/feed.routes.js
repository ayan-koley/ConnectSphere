import Router from 'express';
import { IP } from '../../middlewares/location.middlewares.js';
import { getSuggestedUsers, globalFeed } from '../../controllers/feed/feed.controllers.js';

const router = Router();
router.use(IP);

router.route("/").get(globalFeed);
router.route("/user").get(getSuggestedUsers);

export default router;