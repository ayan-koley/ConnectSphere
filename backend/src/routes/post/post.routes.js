import { Router } from "express";
import { createPost, updatePost, deletePost } from "../../controllers/post/post.controllers.js";
import { requiredAuth } from "../../middlewares/requiredAuth.js";
import { upload } from "../../middlewares/multer.middlewares.js";
import { IP } from "../../middlewares/location.middlewares.js";
const router = Router();

router.use(IP);
router.use(requiredAuth);

router.route("/create").post( upload.array('files', 5) , createPost);
router.route("/update/:postId").patch(updatePost);
router.route("/delete/:postId").delete(deletePost)

export default router;