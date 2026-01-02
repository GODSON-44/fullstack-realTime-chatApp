import express from "express"
import {signup, logout, login, updateProfile} from "../controllers/auth.controller.js"
import { protectRoute } from "../middleware/auth.middleware.js";
import { checkAuth } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", signup)
router.post("/logout", logout)
router.post("/login", login)

// protectRoute is from middleware to see if user is online then only make the changes!!
router.put("/update-profile",protectRoute, updateProfile) 

router.get("/check", protectRoute, checkAuth)// if page is refreshed then check if user is authenticated
// depending on this we take user to the profile page or login page etc...

export default router;