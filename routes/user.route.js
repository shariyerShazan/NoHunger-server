import express from "express"
import { findUserByEmail, login, logout, register } from "../controllers/user.controller.js"
const router = express.Router()


router.post("/register" , register)
router.post("/login" , login)
router.get("/logout" , logout)
router.get("/find-user-by-email/:email" , findUserByEmail)

export default router