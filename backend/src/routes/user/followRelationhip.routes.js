import { Router } from "express";
import { followUser, unfollowUser, getFollowers, getFollowing } from "../../controllers/user/followRelationship.controllers";
import { requiredAuth } from "../../middlewares/requiredAuth.js";
const router = Router();

router.use(requiredAuth());

router.post("/follow/:userId", followUser);
router.post("/unfollow/:userId", unfollowUser);
router.get("/followers/:userId", getFollowers);
router.get("/following/:userId", getFollowing);

export default router;
