import Router from "express";
import { incrementPostView } from "../../controllers/post/postView.controllers"; 
const router = Router();

router.post("/:postId", incrementPostView);

export default router;
