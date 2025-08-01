import { Router } from 'express'
import { requiredAuth } from '../middlewares/requiredAuth.js';
import { getUserPostReactions } from '../controllers/post/reaction.controllers.js';
const router = Router();

router.use(requiredAuth);
router.route("/").get(getUserPostReactions);

export default router;