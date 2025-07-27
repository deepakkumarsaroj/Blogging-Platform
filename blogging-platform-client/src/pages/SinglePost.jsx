import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";

const SinglePost = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchPost = async () => {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/posts/${id}`
      );
      const data = await res.json();
      if (res.ok) setPost(data);
    };

    fetchPost();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;

    const res = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/posts/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (res.ok) navigate("/");
    else alert("Failed to delete post");
  };

  if (!post) return <div className="text-center mt-10">Loading post...</div>;

  const isAuthor = user?._id === post.author?._id;

  return (
    <div className="max-w-4xl mx-auto mt-10 p-4 bg-white rounded shadow">
      <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
      <div className="text-sm text-gray-600 mb-4">
        by <span className="font-semibold">{post.author.username}</span> •{" "}
        {formatDistanceToNow(new Date(post.createdAt))} ago
      </div>

      {post.coverUrl && (
        <img
          src={post.coverUrl}
          alt="cover"
          className="w-full h-[300px] object-cover rounded mb-4"
        />
      )}

      <div
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: post.content }}
      ></div>

      {isAuthor && (
        <div className="mt-6 flex gap-4">
          <Link
            to={`/edit/${post._id}`}
            className="bg-yellow-400 px-4 py-2 rounded text-white hover:bg-yellow-500"
          >
            Edit
          </Link>
          <button
            onClick={handleDelete}
            className="bg-red-500 px-4 py-2 rounded text-white hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default SinglePost;
