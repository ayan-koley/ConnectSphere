import Router from "express";
import { incrementPostView } from "../../controllers/post/postView.controllers.js"; 
const router = Router();

router.route("/:postId").patch(incrementPostView);

export default router;
