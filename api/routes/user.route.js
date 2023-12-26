import express from "express";
import {
  test,
  updateUser,
  deleteUser,
  getUser,
  listing,
} from "../controller/user.controller.js";
import { verifyToken } from "../utils/verifyUser.js";
import { uploadImage } from "../controller/uploadImage.controller.js";
const router = express.Router();

router.get("/test", test);
router.post("/update/:id", verifyToken, updateUser);
router.post("/uploadImage", verifyToken, uploadImage);
router.delete("/delete/:id", verifyToken, deleteUser);
router.get("/listing/:id", verifyToken, listing);
router.get("/:id", verifyToken, getUser);
export default router;
