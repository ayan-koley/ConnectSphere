import Router from 'express';
import { searchPost, searchUserbyUsername } from '../../controllers/search/search.controllers.js';
import { IP } from '../../middlewares/location.middlewares.js';

const router = Router();
router.use(IP);

router.route("/").get(searchPost);
router.route("/user").get(searchUserbyUsername);

export default router;