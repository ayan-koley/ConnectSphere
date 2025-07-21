import { Router } from "express";
import { requiredAuth } from '../../middlewares/requiredAuth.js'
import { updatefirstName, updatelastName, updateBio, updateDescription, getUserProfile } from '../../controllers/user/userProfile.controllers.js'
const router = Router();

router.use(requiredAuth);

router.route("/").get(getUserProfile)
router.route("/update/firstname").patch(updatefirstName)
router.route("/update/lastname").patch(updatelastName)
router.route("/update/bio").patch(updateBio)
router.route("/update/description").patch(updateDescription)

export default router;