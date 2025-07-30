import { Router } from "express";
import { requiredAuth } from "../../middlewares/requiredAuth.js";
import {
  getCurrentTheme,
  getUserSetting,
  toggleTheme,
  updateCountry,
  updateLanguage,
} from "../../controllers/user/userSetting.controllers.js";

const router = Router();

router.use(requiredAuth);

router.route("/").get(getUserSetting);
router.route("/toggle/theme").patch(toggleTheme);
router.route("/update/language").patch(updateLanguage);
router.route("/update/country").patch(updateCountry);
router.route("/theme").get(getCurrentTheme);

export default router;
