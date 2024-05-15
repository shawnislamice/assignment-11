import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthProvider";
import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";
import { updateProfile } from "firebase/auth";
import auth from "../firebase/firebase.config";
import useAxiosSecure from "../hooks/useAxiosSecure";
import axios from "axios";
const Login = () => {
  const { user, signIn, createUser, signInWithGoogle, setLoading, setUser } =
    useContext(AuthContext);

  const axiosSecure = useAxiosSecure();

  const navigate = useNavigate();
  const location = useLocation();
  if (user) {
    navigate("/");
    setLoading(true);
    return;
  }
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    const { email, password, confirmPassword, username, photo } = data;

    if (password !== confirmPassword) {
      toast.error("Password and confirm password dont match");
      return;
    }
    createUser(email, password)
      .then((result) => {
        setUser({ ...result?.user, displayName: username, photoURL: photo });
        updateProfile(auth.currentUser, {
          displayName: username,
          photoURL: photo,
        });
        console.log(result.user);
        // const { data } = axiosSecure.post(`/jwt`, {
        //   email: result?.user?.email,
        // });
        // console.log(data);
        reset();
        navigate(location?.state || "/");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    signIn(email, password)
      .then((result) => {
        console.log(result.user);
        // const { data } = axiosSecure.post(`/jwt`, {
        //   email: result?.user?.email,
        // });
        // console.log(data);
        reset();
        toast.success("Login Successful");
        navigate(location?.state || "/", { replace: true });
      })
      .catch((error) => {
        console.log(error.message);
        toast.error("Login Failed");
      });
  };

  const googleLogin = async () => {
    try {
      const result = await signInWithGoogle();
      // const { data } = await axiosSecure.post(`/jwt`, {
      //   email: result?.user?.email,
      // });
      // console.log(data);
      navigate(location?.state || "/", { replace: true });
      toast.success("Login Successful");
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div className=" flex justify-center items-center my-5 md:my-10">
      <Helmet>
        <title>Prebon Hotels: Login</title>
      </Helmet>
      <Tabs>
        <img src="./logo.svg" alt="" className="block mx-auto md:mb-5" />
        {/* <h1 className="text-center font-bold text-3xl md:pb-3 pb-2">PrebonHotel</h1> */}
        <TabList>
          <Tab>Sign In</Tab>
          <Tab>Register</Tab>
        </TabList>

        <TabPanel>
          <section className="bg-white shadow-xl p-6 rounded-xl ">
            <Helmet>
              <title>Login: PrebonHotel</title>
            </Helmet>
            <div className="container flex items-center justify-center px-6 mx-auto">
              <form onSubmit={handleLogin} className="w-full max-w-md">
                <h1 className="mt-3 text-2xl font-semibold text-gray-800 capitalize sm:text-3xl dark:text-white">
                  sign In
                </h1>

                <div className="relative flex items-center mt-8">
                  <span className="absolute">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </span>

                  <input
                    type="email"
                    className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11  dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    placeholder="Email address"
                    name="email"
                  />
                </div>

                <div className="relative flex items-center mt-4">
                  <span className="absolute">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </span>

                  <input
                    type="password"
                    className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg  dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    placeholder="Password"
                    name="password"
                  />
                </div>

                <div className="mt-6">
                  <button
                    type="submit"
                    className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                  >
                    Sign in
                  </button>

                  <p className="mt-4 text-center text-gray-600 dark:text-gray-400">
                    or sign in with
                  </p>

                  <p
                    onClick={googleLogin}
                    className="cursor-pointer flex mx-auto items-center justify-center px-6 py-3 mt-4 text-gray-600 transition-colors duration-300 transform border rounded-lg dark:border-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <svg className="w-6 h-6 mx-2" viewBox="0 0 40 40">
                      <path
                        d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                        fill="#FFC107"
                      />
                      <path
                        d="M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z"
                        fill="#FF3D00"
                      />
                      <path
                        d="M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z"
                        fill="#4CAF50"
                      />
                      <path
                        d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                        fill="#1976D2"
                      />
                    </svg>

                    <span className="mx-2">Sign in with Google</span>
                  </p>

                  <div className="mt-6 text-center ">
                    <Link
                      to=""
                      href="#"
                      className="text-sm text-blue-500 hover:underline dark:text-blue-400"
                    >
                      Don’t have an account yet? Sign up
                    </Link>
                  </div>
                </div>
              </form>
            </div>
          </section>
        </TabPanel>
        <TabPanel>
          <section className="bg-white shadow-xl rounded-xl md:p-6 p-4 ">
            <Helmet>
              <title>Register: PrebonHotel</title>
            </Helmet>
            <div className="container flex items-center justify-center  px-6 mx-auto">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-full max-w-md"
              >
                <h1 className="text-center font-bold md:text-3xl">
                  Register Now
                </h1>
                <div className="relative flex items-center mt-8">
                  <span className="absolute">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </span>

                  <input
                    type="text"
                    className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11  dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    placeholder="Username"
                    name="username"
                    {...register("username", { required: true })}
                  />
                  {errors.username && (
                    <span className="text-red-500 font-semibold">
                      {" "}
                      Feild is required
                    </span>
                  )}
                </div>
                <div className="relative flex items-center mt-8">
                  <span className="absolute left-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6 text-gray-300 dark:text-gray-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                    </svg>
                  </span>

                  <input
                    type="text"
                    className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11  dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    placeholder="Profile Photo URL"
                    name="photo"
                    {...register("photo", { required: true })}
                  />
                  {errors.photo && (
                    <span className="text-red-500 font-semibold">
                      {" "}
                      Feild is required
                    </span>
                  )}
                </div>

                <div className="relative flex items-center mt-6">
                  <span className="absolute">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </span>

                  <input
                    type="email"
                    className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11  dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    placeholder="Email address"
                    name="email"
                    {...register("email", { required: true })}
                  />
                  {errors.email && (
                    <span className="text-red-500 font-semibold">
                      Feild is required
                    </span>
                  )}
                </div>

                <div className="relative flex items-center mt-4">
                  <span className="absolute">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </span>

                  <input
                    type="password"
                    className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg  dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    placeholder="Password"
                    name="password"
                    {...register("password", { required: true })}
                  />
                  {errors.password && (
                    <span className="text-red-500 font-semibold">
                      Feild is required
                    </span>
                  )}
                </div>

                <div className="relative flex items-center mt-4">
                  <span className="absolute">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </span>

                  <input
                    type="password"
                    className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg  dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    placeholder="Confirm Password"
                    name="confirmPassword"
                    {...register("confirmPassword", { required: true })}
                  />
                  {errors.confirmPassword && (
                    <span className="text-red-500 font-semibold">
                      Feild is required
                    </span>
                  )}
                </div>

                <div className="mt-6">
                  <button
                    type="submit"
                    className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                  >
                    Sign Up
                  </button>

                  <div className="mt-6 text-center ">
                    <Link
                      to="/login"
                      className="text-sm text-blue-500 hover:underline dark:text-blue-400"
                    >
                      Already have an account?
                    </Link>
                  </div>
                </div>
              </form>
            </div>
          </section>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default Login;
