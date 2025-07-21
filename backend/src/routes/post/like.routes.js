import { Router } from "express";
import { toggleCommentLike, togglePostLike } from "../../controllers/post/like.controllers.js";
import { requiredAuth } from "../../middlewares/requiredAuth.js";
const router = Router();

router.use(requiredAuth);

router.route("/post/:postId").post( togglePostLike);
router.route("/comment/:commentId").post(toggleCommentLike);

export default router;
