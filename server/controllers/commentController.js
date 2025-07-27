import Comment from "../models/Comment.js";

// Add a comment
export const addComment = async (req, res) => {
  const { blogId, text } = req.body;
  const userId = req.user.id;

  try {
    const comment = new Comment({
      text,
      user: userId,
      blog: blogId,
    });

    const saved = await comment.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ message: "Error adding comment" });
  }
};

// Get comments for a blog
export const getCommentsByBlog = async (req, res) => {
  const { blogId } = req.params;

  try {
    const comments = await Comment.find({ blog: blogId }).populate(
      "user",
      "username"
    );
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: "Error fetching comments" });
  }
};
