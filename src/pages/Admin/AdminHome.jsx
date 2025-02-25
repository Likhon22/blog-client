import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../utils";
import { FaUsers } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import { RiArticleFill } from "react-icons/ri";
import Loader from "../../components/Loader/Loader";
import UserTable from "../../components/UserTable/UserTable";

const AdminHome = () => {
  const { user } = useAuth();
  const { data: users, isLoading: userLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await axiosInstance.get("/users/all-users");
      return response.data;
    },
  });

  const { data: blogs, isLoading: blogLoading } = useQuery({
    queryKey: ["blogs"],
    queryFn: async () => {
      const response = await axiosInstance.get(`/articles/all-articles`);
      return response.data;
    },
  });
  if (userLoading) {
    return <Loader />;
  }
  if (blogLoading) {
    return <Loader />;
  }
  return (
    <div className="py-24   min-h-screen">
      <div className="stats shadow flex justify-center max-w-3xl mx-auto">
        <div className="stat">
          <div className="stat-figure text-primary">
            <FaUsers className="text-2xl font-bold" />
          </div>
          <div className="stat-title">Total Users</div>
          <div className="stat-value text-primary">{users?.data?.length}</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-secondary">
            <RiArticleFill className="text-2xl font-bold" />
          </div>
          <div className="stat-title">Total Articles</div>
          <div className="stat-value">{blogs?.data?.length}</div>
        </div>
      </div>
      <div className="overflow-x-auto my-10">
        <table className="table-auto border-collapse border w-full max-w-4xl mx-auto shadow-md rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Role</th>
              <th className="p-2 border">Registration Date</th>
            </tr>
          </thead>
          <tbody>
            {users?.data?.map((user) => (
              <UserTable key={user._id} user={user} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminHome;
