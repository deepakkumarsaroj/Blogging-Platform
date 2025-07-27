import express from "express";
import {
  addComment,
  getCommentsByBlog,
} from "../controllers/commentController.js";

import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// Add comment (auth required)
router.post("/", verifyToken, addComment);

// Get comments for blog (public)
router.get("/:blogId", getCommentsByBlog);

export default router;
