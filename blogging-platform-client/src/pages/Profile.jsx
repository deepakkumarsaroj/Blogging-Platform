import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const Profile = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/${id}`
      );
      const data = await res.json();
      if (res.ok) {
        setUser(data.user);
        setPosts(data.posts);
      }
    };

    fetchUserProfile();
  }, [id]);

  if (!user) return <div className="text-center mt-10">Loading profile...</div>;

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-2">{user.username}'s Profile</h2>
      <p className="text-gray-600 mb-4">Email: {user.email}</p>

      <hr className="my-6" />

      <h3 className="text-xl font-semibold mb-4">Posts by {user.username}</h3>
      <div className="space-y-4">
        {posts.map((post) => (
          <div
            key={post._id}
            className="p-4 border rounded hover:bg-gray-100 transition"
          >
            <Link to={`/post/${post._id}`}>
              <h4 className="text-lg font-semibold">{post.title}</h4>
            </Link>
            <p className="text-sm text-gray-500">{post.category}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;
