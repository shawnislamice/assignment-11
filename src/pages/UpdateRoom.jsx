import { useLoaderData, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthProvider";
import Swal from "sweetalert2";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";

const UpdateRoom = () => {
  const room = useLoaderData();
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    const status="Updated"
    const myData={...data,status}
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: "Are you sure to Update It?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, Update it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          const { data: newData = [] } = axiosSecure.put(
            `/myroom/${room?._id}`,
            myData
          );
          console.log(newData);
          swalWithBootstrapButtons.fire({
            title: "Updated!",
            text: "Your room information has been updated.",
            icon: "success",
          });
          navigate(`/rooms/${room?._id}`);
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            text: "Your imaginary file is safe :)",
            icon: "error",
          });
        }
      });
  };
  return (
    <div className="container mx-auto max-w-screen-xl my-5 md:my-10">
      <Helmet>
        <title>Prebon Hotels: Update Room</title>
      </Helmet>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
          <div>
            <label className="text-gray-700 dark:text-gray-200">Name</label>
            <input
              id="username"
              readOnly
              defaultValue={user?.displayName || "Unknwon"}
              type="text"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
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
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
            />
          </div>

          <div>
            <label className="text-gray-700 dark:text-gray-200">
              Room Name
            </label>
            <input
              type="text"
              name="room_name"
              defaultValue={room?.room_name}
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
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
              defaultValue={room?.room_type}
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
              defaultValue={room?.photo}
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
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
              defaultValue={room?.sqft}
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
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
              defaultValue={`${room?.price_per_night} $`}
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
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
              defaultValue={room?.availability}
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
              defaultValue={room?.room_description}
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
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateRoom;
