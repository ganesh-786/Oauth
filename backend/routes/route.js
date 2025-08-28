import express from "express";
import { verifyToken } from "../middlewares/authmiddle.js";
import { roleAuth } from "../middlewares/rolemiddle.js";
import {
  adminUser,
  managerUser,
  userLogin,
  userRegister,
  userUser,
} from "../controller/controller.js";
const router = express.Router();

router.post("/", userRegister);

router.post("/login", userLogin);

router.get("/admin", verifyToken, roleAuth("admin"), adminUser);
router.get("/manager", verifyToken, roleAuth("admin", "manager"), managerUser);
router.get(
  "/user",
  verifyToken,
  roleAuth("admin", "manager", "user"),
  userUser
);

export default router;
