import { Router } from "express";
import { followUser, unfollowUser, getFollowers, getFollowing, getFollowingStatus, getFollowingIds } from "../../controllers/user/followRelationship.controllers.js";
import { requiredAuth } from "../../middlewares/requiredAuth.js";
const router = Router();

router.use(requiredAuth);

router.route("/follow/:followedUserId").post(followUser);
router.route("/unfollow/:followedUserId").post(unfollowUser);
router.route("/followers/:userId").get(getFollowers);
router.route("/following/:userId").get(getFollowing);
router.route("/following/status").get(getFollowingStatus);
router.route("/total").get(getFollowingIds);
export default router;
