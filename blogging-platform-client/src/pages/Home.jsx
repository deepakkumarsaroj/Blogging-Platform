import BlogCard from "../components/BlogCard";
import { useEffect, useState } from "react";

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/posts`)
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((err) => console.error("Failed to load posts", err));
  }, []);

  return (
    <div className="container mx-auto px-4 py-6 grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
      {posts.map((post) => (
        <BlogCard key={post._id} post={post} />
      ))}
    </div>
  );
};

export default Home;
