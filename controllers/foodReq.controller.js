import { FoodRequest } from "../models/foodReq.model.js";
import { Food } from "../models/food.model.js";

export const createFoodRequest = async (req, res) => {
  try {
    const { foodId, requesterId } = req.body;

    const existingRequest = await FoodRequest.findOne({ foodId, requesterId });
    if (existingRequest) {
      return res
        .status(400)
        .json({ 
            message: "You already requested this food." ,
            success : false
        });
    }

    const newRequest = new FoodRequest({
      foodId,
      requesterId,
    });

    await newRequest.save();
    res
      .status(201)
      .json({ 
        message: "Request sent successfully",
        success: true,
      request: newRequest });
  } catch (error) {
    res.status(500).json({ message: "Failed to send request", error });
  }
};


export const getRequestsByUser = async (req, res) => {
    const { userId } = req.params;
    const requests = await FoodRequest.find({ requesterId: userId }).populate("foodId");
    res.status(200).json({ requests });
  };
  





  export const cancelRequest = async (req, res) => {
    try {
      const { id: foodId } = req.params;  
      const { userId } = req.body;        
  
      const deleted = await FoodRequest.findOneAndDelete({ foodId, requesterId: userId });
  
      if (!deleted) {
        return res.status(404).json({ message: "Request not found for this user and food." });
      }
  
      res.status(200).json({ message: "Request cancelled successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to cancel request", error });
    }
  };
  

  export const getRequestsForDonor = async (req, res) => {
    try {
      const { donorId } = req.params;
      if (!donorId) {
        return res.status(400).send({ message: "DonorId is required" });
      }
  
      const foods = await Food.find({ postedBy: donorId });
      const foodIds = foods.map(food => food._id);
  
      const requests = await FoodRequest.find({ foodId: { $in: foodIds } })
        .populate("foodId", "foodName pickLocation")
        .populate("requesterId", "fullName email");
  
      res.status(200).send(requests);
    } catch (error) {
      console.error(error);
    }
  };
  


  export const updateRequestStatusByDonor = async (req, res) => {
    try {
      const { requestId } = req.params;
      const { status } = req.body;
  
      if (!["Approved", "Rejected"].includes(status)) {
        return res.status(400).send({ message: "Invalid status" });
      }
  
      if (!requestId) {
        return res.status(400).send({ message: "Request ID is required" });
      }
  
      const updated = await FoodRequest.findByIdAndUpdate(
        requestId,
        { status },
        { new: true }
      );
  
      if (!updated) {
        return res.status(404).send({ message: "Request not found" });
      }
  
      res.status(200).send(updated);
    } catch (error) {
      console.error(error);
    }
  };
  