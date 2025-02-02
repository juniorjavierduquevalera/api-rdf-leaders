import express from "express";
import {
  createGuest,
  getGuests,
  getGuestById,
  updateGuest,
  deleteGuest,
} from "../controllers/guest.controller.js";

const router = express.Router();

router.post("/", createGuest);

router.get("/", getGuests);

router.get("/:id", getGuestById);

router.put("/:id", updateGuest);

router.delete("/:id", deleteGuest);

export default router;
