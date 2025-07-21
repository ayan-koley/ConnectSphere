import { Router } from "express";
import { authenticateWithClerk } from "../../controllers/user/auth.controllers.js";

const router = Router();
router.route("/clerk").post(authenticateWithClerk);

export default router;