import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [cover, setCover] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("content", content);
    if (cover) formData.append("cover", cover);

    const token = localStorage.getItem("token");

    const res = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/posts/create`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      }
    );

    const data = await res.json();

    if (res.ok) {
      navigate("/");
    } else {
      alert(data.message || "Failed to create post");
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Create New Post</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Post Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />

        <input
          type="text"
          placeholder="Category (e.g. Tech, Health)"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-2 border rounded"
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setCover(e.target.files[0])}
          className="w-full p-2 border rounded"
        />

        <ReactQuill
          theme="snow"
          value={content}
          onChange={setContent}
          placeholder="Write your post here..."
          className="bg-white"
        />

        <button
          type="submit"
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
        >
          Publish
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
