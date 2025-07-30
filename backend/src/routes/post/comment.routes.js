import { Router } from "express";
import {
  createComment,
  updateComment,
  getCommentsByPostId,
  deleteComment,
} from "../../controllers/comment/comment.controllers.js";
import { requiredAuth } from "../../middlewares/requiredAuth.js";

const router = Router();

// Public Route (no auth required)
router.route("/:postId").get(getCommentsByPostId);

// Protected Routes (require authentication)
router.post("/:postId", requiredAuth, createComment);
router.patch("/update/:commentId", requiredAuth, updateComment);
router.delete("/delete/:commentId", requiredAuth, deleteComment);

export default router;
