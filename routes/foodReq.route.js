import express from "express";
import {
  createFoodRequest,
  getRequestsByUser,
  updateRequestStatusByDonor,
  cancelRequest,             
  getRequestsForDonor       
} from "../controllers/foodReq.controller.js";

const router = express.Router();

router.post("/create-request", createFoodRequest);

router.get("/requests-by-user/:userId", getRequestsByUser);

router.patch("/update-status/:requestId", updateRequestStatusByDonor);
router.get("/requests-by-donor/:donorId", getRequestsForDonor);

router.delete("/cancel-request/:id", cancelRequest);



export default router;
