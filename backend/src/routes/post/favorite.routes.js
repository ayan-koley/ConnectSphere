import { Router } from "express";
import { toggleFavoritePost, getUserFavorites } from "../../controllers/post/favorite.controllers";
import { requiredAuth } from "../../middlewares/requiredAuth";
const router = Router();

router.use(requiredAuth());

router.post("/post/:postId", toggleFavoritePost);
router.get("/user", getUserFavorites);


export default router;