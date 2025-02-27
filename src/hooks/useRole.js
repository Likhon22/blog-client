import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import { axiosInstance } from "../utils";

const useRole = () => {
  const { user } = useAuth();
  const { data: userData } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const response = await axiosInstance.get(`/users/${user?.email}`);
      return response.data;
    },
    enabled: !!user?.email,
  });
  return userData?.data?.role;
};

export default useRole;
