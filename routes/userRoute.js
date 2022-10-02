import Express from "express";
import {
  getUser,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from "../controller/User.js";

import { verifyToken } from "../middleware/VerifyToken.js";

const router = Express.Router();

router.get("/user", verifyToken ,getUser);
router.get("/user/:id", getUserById);
router.post("/user", createUser);
router.post("/user/:id", updateUser);
router.delete("/user/:id", deleteUser);

export default router;
