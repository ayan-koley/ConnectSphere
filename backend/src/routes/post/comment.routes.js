import { Router } from "express";
import { createComment, updateComment, getCommentsByPostId, deleteComment } from "../../controllers/post/comment.controllers.js";
import { requiredAuth } from "../../middlewares/requiredAuth.js";
const router = Router();

router.route("/:postId").post(requiredAuth, createComment);
router.route("/update/:commentId").patch(requiredAuth, updateComment);
router.route("/post/:postId").get(getCommentsByPostId);
router.route("delete/:commentId").delete(requiredAuth, deleteComment);

export default router;
