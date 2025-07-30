import { Router } from 'express'
import { requiredAuth } from '../../middlewares/requiredAuth.js';
import { getPostFavoriteStatus, getUserFavorites, toggleFavoritePost } from '../../controllers/post/favorite.controllers.js';
const router = Router();

router.use(requiredAuth);


router.route("/toggle/:postId").patch(toggleFavoritePost);
router.route("/").get(getUserFavorites)
router.route("/:postId/status").get(getPostFavoriteStatus);

export default router;