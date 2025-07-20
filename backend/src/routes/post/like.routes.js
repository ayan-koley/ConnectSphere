import { Router } from "express";
import { toggleCommentLike, togglePostLike } from "../../controllers/post/like.controllers";
import { requiredAuth } from "../../middlewares/requiredAuth";
const router = Router();

router.use(requiredAuth());

router.post("/post/:postId", togglePostLike);
router.post("/comment/:commentId", toggleCommentLike);

export default router;
