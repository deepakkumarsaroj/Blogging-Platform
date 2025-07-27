import express from "express";
import {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
} from "../controllers/blogController.js";

import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public
router.get("/", getAllBlogs);
router.get("/:id", getBlogById);

// Authenticated
router.post("/", verifyToken, createBlog);
router.put("/:id", verifyToken, updateBlog);
router.delete("/:id", verifyToken, deleteBlog);

export default router;
