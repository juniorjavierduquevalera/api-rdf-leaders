import express from "express";
import {
  createLeader,
  getLeaders,
  getLeaderById,
  updateLeader,
  deleteLeader,
} from "../controllers/leader.controller.js";
import { verifyAuth } from "../middlewares/auth.js";

const router = express.Router();

router.post("/",verifyAuth, createLeader);

router.get("/",verifyAuth, getLeaders);

router.get("/:id",verifyAuth, getLeaderById);

router.put("/:id",verifyAuth, updateLeader);

router.delete("/:id",verifyAuth, deleteLeader);

export default router;
