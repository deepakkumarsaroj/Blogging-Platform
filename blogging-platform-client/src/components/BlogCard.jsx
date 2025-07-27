import { Link } from "react-router-dom";

const BlogCard = ({ post }) => {
  return (
    <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition">
      <img
        src={post.image || "/assets/banner.jpg"}
        alt={post.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="text-lg font-bold mb-2">{post.title}</h2>
        <p className="text-sm text-gray-700">
          {post.summary?.slice(0, 100)}...
        </p>
        <Link to={`/post/${post._id}`} className="text-blue-500 mt-2 block">
          Read more
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
