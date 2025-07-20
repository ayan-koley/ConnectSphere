import { Router } from "express";
import { createPost, updatePost } from "../../controllers/post/post.controllers";
import { requiredAuth } from "../../middlewares/requiredAuth";
import { upload } from "../../middlewares/multer.middlewares";
const router = Router();

router.route("/create").post( upload.array('fileArray', 5) ,requiredAuth, createPost);
router.route("/update/:postId").patch(requiredAuth, updatePost);

export default router;