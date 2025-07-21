import Router from 'express';
import { searchPost } from '../../controllers/search/search.controllers.js';
import { IP } from '../../middlewares/location.middlewares.js';

const router = Router();
router.use(IP);

router.route("/").get(searchPost);

export default router;