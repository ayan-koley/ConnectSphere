import { Router } from "express";
import { requiredAuth } from '../middlewares/requiredAuth.js'
import { updatefirstName, updatelastName, updateAvatar, updateBio, updateDescription, getUserProfile } from "../controllers/userProfile.controllers.js";
const router = Router();

router.use(requiredAuth());

router.route("/").get(getUserProfile)
router.route("/update/firstName").patch(updatefirstName)
router.route("/update/lastName").patch(updatelastName)
router.route("/update/avatar").patch(updateAvatar)
router.route("/update/bio").patch(updateBio)
router.route("/update/description").patch(updateDescription)

export default router;