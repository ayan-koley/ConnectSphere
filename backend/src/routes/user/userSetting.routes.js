import { Router } from "express";
import { requiredAuth } from "../../middlewares/requiredAuth.js";
import {
  changeTheme,
  getUserSetting,
  updateCountry,
  updateLanguage,
} from "../../controllers/user/userSetting.controllers.js";

const router = Router();

router.use(requiredAuth);

router.route("/").get(getUserSetting);
router.route("/toggle/theme").patch(changeTheme);
router.route("/update/language").patch(updateLanguage);
router.route("/update/country").patch(updateCountry);

export default router;
