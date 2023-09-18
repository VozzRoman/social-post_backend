import express from "express";
import ctrlSignup from "../../controllers/auth/signUp.js";
import ctrlSignin from "../../controllers/auth/signIn.js";
import ctrlCurrent from "../../controllers/auth/current.js";
import ctrlAvatarUpdate from "../../controllers/auth/patchAvatar.js";
import { validation } from "../../middleWare/validation.js";
import ctrlLogout from "../../controllers/auth/logout.js";
import { signInSchema, signUpSchema } from "../../model/userModel.js";
import { authinticate } from "../../middleWare/authinticate.js";

const router = express.Router();

router.post("/signup", validation(signUpSchema), ctrlSignup);
router.post("/signin", validation(signInSchema), ctrlSignin);
router.get("/current", authinticate, ctrlCurrent);
router.post("/logout", authinticate, ctrlLogout);
router.patch("/user/avatar", authinticate, ctrlAvatarUpdate);

export default router;
