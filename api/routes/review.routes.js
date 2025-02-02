import express from "express";
import {
  createReview,
  getReviews,
  getReviewById,
  updateReview,
  deleteReview,
} from "../controllers/review.controller.js";
import { verifyAuth } from "../middlewares/auth.js";

const router = express.Router();

router.post("/", verifyAuth, createReview);
router.get("/", getReviews); 
router.get("/:id", getReviewById); 
router.put("/:id", verifyAuth, updateReview);  
router.delete("/:id", verifyAuth, deleteReview);  

export default router;
