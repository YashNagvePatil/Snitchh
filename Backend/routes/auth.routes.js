import { Router } from "express";
import { getMe, login, register } from "../controllers/auth.controller.js";
import { validateLoginUser, validateRegisteruser } from "../validator/auth.validator.js";
import { authenticateSeller, authenticateuser } from "../middlewares/auth.middleware.js";



 const router = Router()

 router.post("/register",validateRegisteruser,register)

 router.post("/login",validateLoginUser,login)

/**
 * @route Get /api/auth/me
 * @description Get the aunthenticated user's profile
 * @access Private
 */

 router.get("/me",authenticateuser,getMe)
 export default router