import { Router } from "express";
import { getLikeStatus, toggleCommentLike, togglePostLike } from "../../controllers/post/like.controllers.js";
import { requiredAuth } from "../../middlewares/requiredAuth.js";
const router = Router();

router.use(requiredAuth);

router.route("/post/:postId").post( togglePostLike);
router.route("/comment/:commentId").post(toggleCommentLike);
router.route("/:id").get(getLikeStatus);

export default router;
