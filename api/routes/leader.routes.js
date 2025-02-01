import express from "express";
import {
  createLeader,
  getLeaders,
  getLeaderById,
  updateLeader,
  deleteLeader,
} from "../controllers/leader.controller.js";

const router = express.Router();

router.post("/", createLeader);

router.get("/", getLeaders);

router.get("/:id", getLeaderById);

router.put("/:id", updateLeader);

router.delete("/:id", deleteLeader);

export default router;
