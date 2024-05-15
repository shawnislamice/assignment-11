import { useContext } from "react";
import { AuthContext } from "../contexts/AuthProvider";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";
import { CiSettings } from "react-icons/ci";
import { Helmet } from "react-helmet-async";

const AddRoom = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const location = useLocation();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    const sellerEmail = user?.email;
    const sellerName = user?.displayName;
    const seller = { sellerName, sellerEmail };
    const status='Added'
    const newData = { ...data, seller,status };
    Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Add Rom",
      denyButtonText: `Don't add`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        axiosSecure.post("/rooms", newData).then((res) => {
          Swal.fire("Successfully Added!", "", "success");
          console.log(res.data);
          reset();
          navigate(location?.state || '/myrooms')
        });
      } else if (result.isDenied) {
        Swal.fire("Rooms are not added", "", "info");
      }
    });
  };
  return (
    <div>
      <Helmet>
        <title>Prebon Hotels: Add Room</title>
      </Helmet>
      <section className="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md ">
        <h2 className="text-lg font-semibold text-gray-700 capitalize dark:text-white">
          Add Room Now
        </h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            <div>
              <label className="text-gray-700 dark:text-gray-200">Name</label>
              <input
                id="username"
                readOnly
                defaultValue={user?.displayName || "Unknwon"}
                type="text"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
              />
            </div>

            <div>
              <label className="text-gray-700 dark:text-gray-200">
                Email Address
              </label>
              <input
                readOnly
                defaultValue={user?.email || "Unknwon"}
                id="emailAddress"
                type="email"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
              />
            </div>

            <div>
              <label className="text-gray-700 dark:text-gray-200">
                Room Name
              </label>
              <input
                type="text"
                name="room_name"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                {...register("room_name", { required: true })}
              />
              {errors.room_name && (
                <span className="text-red-500 font-semibold">
                  Feild is required
                </span>
              )}
            </div>

            <div>
              <label className="text-gray-700 dark:text-gray-200">
                Room Category
              </label>
              <select
                className="  select select-bordered select-sm w-full max-w-xl h-[40px] top-2 relative"
                name="room_type"
                {...register("room_type", { required: true })}
              >
                <option disabled selected>
                  Choose Room Category
                </option>
                <option>Single</option>
                <option>Double</option>
                <option>Villa</option>
                <option>Family</option>
                <option>PentHouse</option>
                <option>Suite</option>
                <option>Accessible</option>
                <option>Apartment</option>
                <option>Lounge</option>
                <option>Suite</option>
              </select>
              {errors.room_type && (
                <span className="text-red-500 font-semibold">
                  Feild is required
                </span>
              )}
            </div>
            <div>
              <label className="text-gray-700 dark:text-gray-200">
                Room Photo
              </label>
              <input
                type="text"
                name="photo"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                {...register("photo", { required: true })}
              />
              {errors.photo && (
                <span className="text-red-500 font-semibold">
                  Feild is required
                </span>
              )}
            </div>

            <div>
              <label className="text-gray-700 dark:text-gray-200">
                Room Size(sqft)
              </label>
              <input
                type="text"
                name="sqft"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                {...register("sqft", { required: true })}
              />
              {errors.sqft && (
                <span className="text-red-500 font-semibold">
                  Feild is required
                </span>
              )}
            </div>
            <div>
              <label className="text-gray-700 dark:text-gray-200">
                Price Per Night
              </label>
              <input
                type="text"
                name="price_per_night"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                {...register("price_per_night", { required: true })}
              />
              {errors.price_per_night && (
                <span className="text-red-500 font-semibold">
                  Feild is required
                </span>
              )}
            </div>

            <div>
              <label className="text-gray-700 dark:text-gray-200">
                Room Availability
              </label>
              <select
                className="  select select-bordered select-sm w-full max-w-xl h-[40px] top-2 relative"
                name="availability"
                {...register("availability", { required: true })}
              >
                <option disabled selected>
                  Availability
                </option>
                <option>true</option>
                <option>false</option>
              </select>
              {errors.availability && (
                <span className="text-red-500 font-semibold">
                  Feild is required
                </span>
              )}
            </div>
            <div className="md:col-span-2">
              <label className="text-gray-700 dark:text-gray-200 ">
                Room Description
              </label>
              <textarea
                className="textarea textarea-bordered w-full mt-2"
                placeholder="Describe About Room"
                name="room_description"
                {...register("room_description", { required: true })}
              ></textarea>
              {errors.room_description && (
                <span className="text-red-500 font-semibold">
                  Feild is required
                </span>
              )}
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <button
              type="submit"
              className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
            >
              Save
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default AddRoom;
