import axios from "axios";

const axiosSecure = axios.create({
  baseURL: "https://hotel-assignment-server.vercel.app",
  withCredentials: true,
});
const useAxiosSecure = () => {
  // const { logOut,user } = useContext(AuthContext);
  // console.log(logOut);
  // console.log(user);
  // const navigate = useNavigate();

  axiosSecure.interceptors.response.use(
    (res) => {
      return res;
    }
    // async (error) => {
    //   if (error.response.status == 401 || error.response.status == 403) {
    //     await logOut();
    //     navigate("/login");
    //   }
    //   return Promise.reject(error);
    // }
  );
  return axiosSecure;
};

export default useAxiosSecure;
