import { Router } from "express";
import { loginUser, registerUser } from "../controllers/user.controllers.js";
import { loginValidator, registerUserValidator, validate } from "../lib/validators.js";
const router=Router();

router.post("/register",registerUserValidator(),validate,registerUser)
router.post("/login",loginValidator(),validate,loginUser);
export default router;