import { Router } from "express";
import { createComment, updateComment, getCommentsByPostId, deleteComment } from "../../controllers/post/comment.controllers.js";
import { requiredAuth } from "../../middlewares/requiredAuth.js";
const router = Router();


router.route("/:postId").get(getCommentsByPostId);

router.use(requiredAuth);

router.route("/:postId").post(createComment);
router.route("/update/:commentId").patch(updateComment);
router.route("delete/:commentId").delete(deleteComment);

export default router;
