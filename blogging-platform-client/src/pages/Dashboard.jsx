import { useEffect, useState } from "react";

const Dashboard = () => {
  const [stats, setStats] = useState({ users: 0, posts: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/stats`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = await res.json();
      if (res.ok) setStats(data);
    };

    fetchStats();
  }, []);

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-blue-100 p-6 rounded">
          <h2 className="text-xl font-semibold">Total Users</h2>
          <p className="text-3xl mt-2">{stats.users}</p>
        </div>

        <div className="bg-green-100 p-6 rounded">
          <h2 className="text-xl font-semibold">Total Posts</h2>
          <p className="text-3xl mt-2">{stats.posts}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
