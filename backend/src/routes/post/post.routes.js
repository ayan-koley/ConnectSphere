import { Router } from "express";
import { createPost, updatePost, deletePost, getPostById, getUserAllPost, getAllMentionPosts } from "../../controllers/post/post.controllers.js";
import { requiredAuth } from "../../middlewares/requiredAuth.js";
import { upload } from "../../middlewares/multer.middlewares.js";
import { IP } from "../../middlewares/location.middlewares.js";
const router = Router();


router.route("/:postId").get(getPostById)
router.route("/user/:userId").get(getUserAllPost)
router.route("/user/mention/:userId").get(getAllMentionPosts)

router.use(requiredAuth);
router.use(IP);

router.route("/create").post( upload.array('files', 5) , createPost);
router.route("/update/:postId").patch(updatePost);
router.route("/delete/:postId").delete(deletePost)

export default router;