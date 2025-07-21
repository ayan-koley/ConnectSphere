import { Router } from "express";
import { toggleFavoritePost, getUserFavorites } from "../../controllers/post/favorite.controllers.js";
import { requiredAuth } from "../../middlewares/requiredAuth.js";
const router = Router();

router.use(requiredAuth);

router.route("/:postId").post( toggleFavoritePost);
router.route("/user").get(getUserFavorites);


export default router;