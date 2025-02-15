import express from "express";
import {
  createGuest,
  getGuests,
  getGuestById,
  updateGuest,
  deleteGuest,
} from "../controllers/guest.controller.js";
import { verifyAuth } from "../middlewares/auth.js";

const router = express.Router();

router.post("/", verifyAuth, createGuest);

router.get("/", verifyAuth, getGuests);

router.get("/:id", verifyAuth, getGuestById);

router.put("/:id", verifyAuth, updateGuest);

router.delete("/:id", verifyAuth, deleteGuest);

export default router;
