import { Router } from "express";
import { createComment, updateComment, getCommentsByPostId, deleteComment } from "../../controllers/post/comment.controllers";
import { requiredAuth } from "../../middlewares/requiredAuth";
const router = Router();

router.post("/", requiredAuth, createComment);
router.put("/:commentId", requiredAuth, updateComment);
router.get("/post/:postId", getCommentsByPostId);
router.delete("/:commentId", requiredAuth, deleteComment);

export default router;
