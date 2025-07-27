import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const EditPost = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [cover, setCover] = useState(null);
  const [oldCoverUrl, setOldCoverUrl] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchPost = async () => {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/posts/${id}`
      );
      const data = await res.json();

      if (res.ok) {
        setTitle(data.title);
        setCategory(data.category);
        setContent(data.content);
        setOldCoverUrl(data.coverUrl);
      } else {
        alert("Failed to fetch post.");
      }
    };

    fetchPost();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("content", content);
    if (cover) formData.append("cover", cover);

    const token = localStorage.getItem("token");

    const res = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/posts/${id}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      }
    );

    const data = await res.json();

    if (res.ok) {
      navigate(`/post/${id}`);
    } else {
      alert(data.message || "Failed to update post");
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Edit Post</h2>

      <form onSubmit={handleUpdate} className="space-y-4">
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
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-2 border rounded"
        />

        <div>
          {oldCoverUrl && (
            <img
              src={oldCoverUrl}
              alt="Old cover"
              className="w-full h-60 object-cover rounded mb-2"
            />
          )}
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setCover(e.target.files[0])}
            className="w-full p-2 border rounded"
          />
        </div>

        <ReactQuill
          theme="snow"
          value={content}
          onChange={setContent}
          placeholder="Edit your post..."
          className="bg-white"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Update Post
        </button>
      </form>
    </div>
  );
};

export default EditPost;
