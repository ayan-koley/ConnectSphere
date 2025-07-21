import Router from 'express';
import { IP } from '../../middlewares/location.middlewares.js';
import { globalFeed } from '../../controllers/feed/feed.controllers.js';

const router = Router();
router.use(IP);

router.route("/").get(globalFeed);

export default router;