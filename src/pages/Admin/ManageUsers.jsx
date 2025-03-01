import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { FiUsers, FiCheck, FiMail, FiCalendar } from "react-icons/fi";
import toast from "react-hot-toast";
import { axiosInstance } from "../../utils";
import Loader from "../../components/Loader/Loader";
import useAuth from "../../hooks/useAuth";

const ManageUsers = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);
  const queryClient = useQueryClient();
  const { user } = useAuth();
  // Fetch users data
  const {
    data: usersData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await axiosInstance.get("/users/all-users");
      return response.data;
    },
  });

  // Mutation for updating user role
  const updateRoleMutation = useMutation({
    mutationFn: async ({ userId, newRole }) => {
      console.log(newRole);
      return await axiosInstance.patch(`/users/update-role/${userId}`, {
        role: newRole,
        email: user?.email,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
      toast.success("User role updated successfully");
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message || "Failed to update user role"
      );
    },
  });

  // Handle role change
  const handleRoleChange = (userId, newRole) => {
    updateRoleMutation.mutate({ userId, newRole });
  };

  // Pagination logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = usersData?.data?.slice(
    indexOfFirstUser,
    indexOfLastUser
  );
  const totalPages = usersData?.data
    ? Math.ceil(usersData.data.length / usersPerPage)
    : 0;

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Role badge style
  const getRoleBadgeClass = (role) => {
    return role.toLowerCase() === "admin"
      ? "badge badge-primary"
      : "badge badge-ghost";
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="alert alert-error shadow-lg max-w-md">
          <div>
            <span>Failed to load users. Please try again.</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold flex items-center">
          <FiUsers className="mr-2" /> Manage Users
        </h2>
        <p className="text-base-content/70 mt-2">
          View and manage all registered users on the platform
        </p>
      </div>

      {/* Stats Overview */}
      <div className="mb-6">
        <div className="stats bg-base-200 shadow w-full">
          <div className="stat">
            <div className="stat-title">Total Users</div>
            <div className="stat-value">{usersData?.data?.length || 0}</div>
          </div>
          <div className="stat">
            <div className="stat-title">Admins</div>
            <div className="stat-value text-primary">
              {usersData?.data?.filter((user) => user.role === "admin")
                .length || 0}
            </div>
          </div>
          <div className="stat">
            <div className="stat-title">Regular Users</div>
            <div className="stat-value text-neutral">
              {usersData?.data?.filter((user) => user.role === "user").length ||
                0}
            </div>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="overflow-x-auto bg-base-100 rounded-lg shadow">
        <table className="table w-full">
          <thead>
            <tr>
              <th className="bg-base-200">User</th>
              <th className="bg-base-200">Email</th>
              <th className="bg-base-200">Role</th>
              <th className="bg-base-200">Joined</th>
              <th className="bg-base-200">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers?.length > 0 ? (
              currentUsers.map((user) => (
                <tr key={user._id} className="hover">
                  <td>
                    <div className="flex items-center space-x-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-10 h-10">
                          <img
                            src={
                              user.avatar ||
                              `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                user.name
                              )}&background=random`
                            }
                            alt={user.name}
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{user.name}</div>
                        {user.role === "admin" && (
                          <div className="badge badge-primary badge-sm">
                            Admin
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center">
                      <FiMail className="mr-1 text-base-content/70" />
                      <span>{user.email}</span>
                    </div>
                  </td>
                  <td>
                    <span className={getRoleBadgeClass(user.role)}>
                      {user.role}
                    </span>
                  </td>
                  <td>
                    <div className="flex items-center">
                      <FiCalendar className="mr-1 text-base-content/70" />
                      <span>{formatDate(user.createdAt)}</span>
                    </div>
                  </td>
                  <td>
                    <div className="dropdown dropdown-end">
                      <label tabIndex={0} className="btn btn-sm m-1">
                        Change Role
                      </label>
                      <ul
                        tabIndex={0}
                        className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
                      >
                        <li>
                          <button
                            onClick={() => handleRoleChange(user._id, "user")}
                            className={`flex items-center justify-between ${
                              user.role === "user" ? "text-primary" : ""
                            }`}
                            disabled={updateRoleMutation.isLoading}
                          >
                            User
                            {user.role === "user" && (
                              <FiCheck className="text-primary" />
                            )}
                          </button>
                        </li>
                        <li>
                          <button
                            onClick={() => handleRoleChange(user._id, "admin")}
                            className={`flex items-center justify-between ${
                              user.role === "admin" ? "text-primary" : ""
                            }`}
                            disabled={updateRoleMutation.isLoading}
                          >
                            Admin
                            {user.role === "admin" && (
                              <FiCheck className="text-primary" />
                            )}
                          </button>
                        </li>
                      </ul>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center py-8">
                  <p>No users available</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6">
          <div className="btn-group">
            <button
              className="btn btn-sm"
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
            >
              «
            </button>
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                className={`btn btn-sm ${
                  currentPage === index + 1 ? "btn-active" : ""
                }`}
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </button>
            ))}
            <button
              className="btn btn-sm"
              onClick={() =>
                setCurrentPage(Math.min(totalPages, currentPage + 1))
              }
              disabled={currentPage === totalPages}
            >
              »
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageUsers;
