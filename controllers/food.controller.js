import { Food } from "../models/food.model.js";

export const addFood = async (req, res) => {
  try {
    const {
      foodName,
      foodImage,
      quantity,
      pickLocation,
      expriredIn,
      additionalNotes,
      foodStatus,
      postedBy,
    } = req.body;

    if (
      !foodName ||
      !foodImage ||
      !quantity ||
      !pickLocation ||
      !expriredIn ||
      !additionalNotes ||
      !foodStatus ||
      !postedBy
    ) {
      return res.status(400).json({
        message: "Something is missing",
        success: false,
      });
    }
    if (additionalNotes.length > 250) {
      return res.status(400).json({
        message: "Additional notes must be less than 250 characters",
        success: false,
      });
    }
    if (foodName.length > 15) {
      return res.status(400).json({
        message: "Food Name must be less than 15 characters",
        success: false,
      });
    }

    // const donorId = req.params.id;

    const newFood = await Food.create({
      foodName,
      foodImage,
      quantity,
      pickLocation,
      expriredIn,
      additionalNotes,
      foodStatus,
      postedBy,
    });

    return res.status(200).json({
      message: "Posted successfully",
      success: true,
      newFood,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error", success: false });
  }
};

 


export const getAllFoodPost = async (req, res) => {
  try {
    const keyword = req.query.keyword || "";
    const query = {
      $or: [
        { foodName: { $regex: keyword, $options: "i" } },
        { additionalNotes: { $regex: keyword, $options: "i" } },
      ],
    };
    const postedFood = await Food.find(query);
    if (!postedFood) {
      return res.status(404).json({
        message: "No Food Donated",
        success: false,
      });
    }
    return res.status(200).json({
      foods: postedFood,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};



export const getDonorFoodPost = async (req, res) => {
  try {
    const id = req.params.id;
    const donorfoodPost = await Food.find({ postedBy: id });
    if (!donorfoodPost) {
      return res.status(400).json({
        message: "You have no Post yet",
        success: false,
      });
    }
    return res.status(200).json({
      foods: donorfoodPost,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};


export const getFoodPostById = async (req , res)=>{
  try {
    const postId = req.params.id 
    const post = await Food.findById(postId)
    if (!post) {
      return res.status(404).json({
        message: "Post not found",
        success: false,
      });
    }
    return res.status(200).json({
      success: true,
      post 
    });
  } catch (error) {
    console.log(error)
  }
}


export const updatePostBydonor = async (req, res) => {
  try {
    const postId = req.params.id;

    const post = await Food.findById(postId);

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
        success: false,
      });
    }

    const updatedFoodData = req.body;

    const updatedFoodPost = await Food.findByIdAndUpdate(
      postId,
      updatedFoodData,
      {
        new: true,
        runValidators: true,
      }
    );

    return res.status(200).json({
      message: "Post updated successfully",
      success: true,
      post: updatedFoodPost,
    });
  } catch (error) {
    console.log(error);
  }
};



// eta abr kore try korte hobe shazan
export const foodStatusUpdate = async (req, res) => {
  const postId = req.params.id;
  const { foodStatus } = req.body;

  if (!foodStatus) {
    return res.status(400).json({
      message: "Food status is required",
      success: false,
    });
  }

  try {
    const updatedFood = await Food.findByIdAndUpdate(
      postId,
      { foodStatus },
      { new: true, runValidators: true }
    );

    if (!updatedFood) { 
      return res
        .status(404)
        .json({ message: "Food post not found", success: false });
    }

    return res.status(200).json({
      message: "Food status updated successfully",
      success: true,
      updatedFood,
    });
  } catch (error) {
    console.error(" Error in foodStatusUpdate controller:", error.message);
    return res.status(500).json({
      message: "Something went wrong",
      success: false,
      error: error.message, 
    });
  }
};



export const deleteFoodPostByDonor = async (req, res) => {
  try {
    const postId = req.params.id;
    const deleteFoodPost = await Food.deleteOne({ _id: postId }); 

    return res.status(200).json({
      message: "Post deleted successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
