import express from "express"
import { addFood, deleteFoodPostByDonor, foodStatusUpdate, getAllFoodPost, getDonorFoodPost, getFoodPostById, updatePostBydonor } from "../controllers/food.controller.js"

const router = express.Router()


router.post("/add-food" , addFood)
router.get("/get-donor-food/:id" , getDonorFoodPost)
router.get("/get-all-food" , getAllFoodPost)
router.get("/get-post-by-id/:id" , getFoodPostById)
router.put("/update-donor-post/:id" , updatePostBydonor)
router.patch('/food-status-update/:id', foodStatusUpdate);
router.delete('/delete-by-donor/:id', deleteFoodPostByDonor);


export default router 