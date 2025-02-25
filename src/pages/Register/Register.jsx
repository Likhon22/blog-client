import { Helmet } from "react-helmet-async";

import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import { axiosInstance } from "../../utils";

const Register = () => {
  const [toggle, setToggle] = useState(false);
  const navigate = useNavigate();
  const { register, updateUserName, logout } = useAuth();
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  console.log(location);
  const to = location?.state?.from?.pathname || "/";
  const handleRegister = async (e) => {
    e.preventDefault();
    const form = e.target;

    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    try {
      setLoading(true);
      const data = await register(email, password);
      await updateUserName(name);
      const userEmail = data.user.email;

      if (userEmail) {
        const userInfo = {
          name: data.user.displayName,
          email: userEmail,
        };
        const result = await axiosInstance.post("/users/create-user", userInfo);
        await logout();
        setLoading(false);
        if (result.data.success) {
          toast.success("Registered Successfully");
          navigate("/login");
        }
      }
      //   navigate("/login");
      toast.success("Registered Successfully");
    } catch (err) {
      toast.error(err.message);
      setLoading(false);
    }
  };
  if (loading) {
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <span className="loading loading-bars loading-xs"></span>
        <span className="loading loading-bars loading-sm"></span>
        <span className="loading loading-bars loading-md"></span>
        <span className="loading loading-bars loading-lg"></span>
      </div>
    );
  }
  return (
    <div>
      <Helmet>
        <title>Blog | Register</title>
      </Helmet>
      <div className="md:w-3/5 mx-4 md:mx-auto items-center mt-20 py-16 bg-cyan-400 rounded-xl">
        <div className="hero-content flex-col ">
          <div className="text-center lg:text-left">
            <h1 className=" text-3xl md:text-4xl lg:text-5xl font-bold mb-10 text-white">
              Please Register{" "}
            </h1>
          </div>
          <div className="card md:w-3/4   lg:w-1/2   shadow-2xl bg-base-100">
            <form className="card-body" onSubmit={handleRegister}>
              <div className="form-control flex flex-col ">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  placeholder="name"
                  name="name"
                  className="input input-bordered w-[90%]"
                  required
                />
              </div>
              <div className="form-control flex flex-col ">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="email"
                  name="email"
                  className="input input-bordered w-[90%]"
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <div className="flex items-center relative ">
                  <input
                    type={toggle ? "text" : "password"}
                    placeholder="password"
                    name="password"
                    className="input input-bordered w-[90%] "
                    required
                  />
                  {toggle ? (
                    <AiOutlineEyeInvisible
                      onClick={() => setToggle(!toggle)}
                      className="relative right-6 cursor-pointer"
                    ></AiOutlineEyeInvisible>
                  ) : (
                    <AiOutlineEye
                      onClick={() => setToggle(!toggle)}
                      className="relative right-6 cursor-pointer"
                    ></AiOutlineEye>
                  )}
                </div>
              </div>
              <div className="form-control flex justify-center mt-3">
                <button
                  type="submit"
                  className="btn btn-secondary bg-cyan-400 hover:bg-cyan-600 border-none shadow-none"
                >
                  Register
                </button>
              </div>
            </form>
            <p className="text-center mb-4">
              Already have an account? Please{" "}
              <NavLink
                to="/login"
                className="text-blue-700 hover:border-b border-black"
              >
                Login
              </NavLink>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
