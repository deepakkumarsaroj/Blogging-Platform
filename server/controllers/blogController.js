import Blog from "../models/Blog.js";

// Create a new blog post
export const createBlog = async (req, res) => {
  const { title, content, category } = req.body;
  const userId = req.user.id;

  try {
    const newBlog = new Blog({
      title,
      content,
      category,
      author: userId,
    });

    const savedBlog = await newBlog.save();
    res.status(201).json(savedBlog);
  } catch (error) {
    console.error("Create Blog Error:", error);
    res.status(500).json({ message: "Server error while creating blog" });
  }
};

// Get all blog posts
export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find()
      .populate("author", "username")
      .sort({ createdAt: -1 });
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch blogs" });
  }
};

// Get a single blog post by ID
export const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate(
      "author",
      "username"
    );
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ message: "Error fetching blog" });
  }
};

// Update a blog post
export const updateBlog = async (req, res) => {
  const { title, content, category } = req.body;
  const blogId = req.params.id;

  try {
    const updated = await Blog.findByIdAndUpdate(
      blogId,
      { title, content, category },
      { new: true }
    );

    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: "Failed to update blog" });
  }
};

// Delete a blog post
export const deleteBlog = async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting blog" });
  }
};
