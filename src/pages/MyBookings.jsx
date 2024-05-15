import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthProvider";
import toast from "react-hot-toast";
import { MdOutlineFreeCancellation } from "react-icons/md";
import { useForm } from "react-hook-form";
import { CiSettings } from "react-icons/ci";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import { CiViewTable } from "react-icons/ci";
import { CiGrid41 } from "react-icons/ci";
import BookingCard from "../components/BookingCard";

const MyBookings = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const [openModal, setOpenModal] = useState(false);
  const [roomName, setRoomName] = useState("");
  const [roomId, setRoomId] = useState(null);
  const [bookingId, setBookingID] = useState(null);
  const [viewMode, setViewMode] = useState("table");
  // console.log(roomd);
  // console.log(roomId);
  const {
    data: bookings = [],
    isError,
    error,
    isLoading,
    refetch,
  } = useQuery({
    queryFn: () => getData(),
    queryKey: ["my-bookings"],
  });

  // console.log(bookings);
  const getData = async () => {
    const { data } = await axiosSecure.get(`/bookingss/${user?.email}`);
    return data;
  };

  const handleCancelBooking = async (
    id,
    previousStatus,
    currentStatus,
    roomID,
    duration
  ) => {
    console.log(id, previousStatus, currentStatus, roomID);
    const currentAvilability = "true";
    if (previousStatus === currentStatus) {
      toast.error("You Can Not Perform This Action");
      return;
    }
    if (duration == 1) {
      toast.error("You can not cancel rooms before one days!");
      return;
    }
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: "Are you sure to cancel this booking?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes,Cancel it!",
        cancelButtonText: "No, proceed!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          axiosSecure.put(`/bookings/${id}`, { currentStatus }).then((res) => {
            console.log(res.data);
            refetch();
            swalWithBootstrapButtons.fire({
              title: "Cenceled!",
              text: "Your booking has been canceled.",
              icon: "success",
            });
          });
          axiosSecure
            .put(`/rooms/${roomID}`, { currentAvilability })
            .then((res) => console.log(res.data));
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            text: "Your booking is proceed :)",
            icon: "error",
          });
        }
      });
  };
  const handleDelete = async (id) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          axiosSecure.delete(`/bookings/${id}`).then((res) => {
            console.log(res.data);
            swalWithBootstrapButtons.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
            refetch();
          });
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
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const userName = user?.displayName;
    const userEmail = user?.email;
    const userPhoto = user?.photoURL;
    const getCurrentTime = () => {
      const now = new Date();
      const formattedTime = now.toLocaleString(); // Customize the formatting as needed
      return formattedTime;
    };
    const currentTime = getCurrentTime();
    const newData = {
      ...data,
      roomName,
      roomId,
      userName,
      userEmail,
      userPhoto,
      currentTime,
    };
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: "Are you sure to add review?",
        text: "You review will be posted !",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Make Review!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          axiosSecure.post("/reviews", newData).then((res) => {
            console.log(res.data);
            swalWithBootstrapButtons.fire({
              title: "Review Posted!",
              text: "Your review has been posted.",
              icon: "success",
            });
            reset();
            axiosSecure
              .put(`/bookings/${bookingId}`, { currentStatus: "Reviewed" })
              .then((res) => console.log(res.data));
            refetch();
          });
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
    console.log(data);
  };
  if (isLoading) {
    return <Spinner></Spinner>;
  }
  if (isError || error) {
    toast.error(error.message);
  }
  const handleTable = (e) => {
    e.preventDefault();
    setViewMode("table");
  };
  const handleGrid = (e) => {
    e.preventDefault();
    setViewMode("grid");
  };
  return (
    <div className="container mx-auto max-w-screen-xl my-5 md:my-10">
      <Helmet>
        <title>Prebon Hotels: My Bookings</title>
      </Helmet>
      {bookings.length > 0 && (
        <section className="container px-4 mx-auto">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-x-3">
              <h2 className="text-lg font-medium text-gray-800 dark:text-white">
                Your Bookings
              </h2>

              <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full  dark:text-blue-400">
                {bookings.length} Bookings
              </span>
            </div>
            <div className="flex  gap-2 mr-3">
              <button className="cursor-pointer hover:scale-95 duration-500 hover:text-yellow-500"  onClick={handleTable}>
                <CiViewTable size={20}></CiViewTable>
              </button>
              <button  className="cursor-pointer hover:scale-95 duration-500 hover:text-pink-500" onClick={handleGrid}>
                <CiGrid41 size={20}></CiGrid41>
              </button>
            </div>
          </div>

          <div className="flex flex-col mt-6">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                  <table
                    id="booking-table"
                    className={viewMode=='table'?'min-w-full divide-y divide-gray-200 dark:divide-gray-700':'hidden'}
                  >
                    <thead className="bg-gray-50 ">
                      <tr>
                        <th className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                          Room Type
                        </th>

                        <th
                          scope="col"
                          className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                        >
                          <button className="flex items-center gap-x-2">
                            <span>Total Cost</span>
                          </button>
                        </th>

                        <th
                          scope="col"
                          className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                        >
                          <button className="flex items-center gap-x-2">
                            <span>Check In</span>
                          </button>
                        </th>

                        <th
                          scope="col"
                          className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                        >
                          Check Out
                        </th>

                        <th
                          scope="col"
                          className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                        >
                          Current Status
                        </th>

                        <th className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 ">
                      {bookings.map((booking) => (
                        <tr key={booking?._id}>
                          <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                            <div className="inline-flex items-center gap-x-3">
                              <div className="flex items-center gap-x-2">
                                <div>
                                  <h2 className="font-medium text-gray-800 dark:text-white ">
                                    {booking?.roomType}
                                  </h2>
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-12 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                            <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2  ">
                              <p>$ {booking?.totalCost}</p>
                            </div>
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                            {new Date(booking?.checkIn).toLocaleDateString()}
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                            {new Date(booking?.checkOut).toLocaleDateString()}
                          </td>
                          <td className="px-4 py-4 text-sm whitespace-nowrap">
                            <div className="flex items-center gap-x-2">
                              <p
                                className={`${
                                  booking?.status == "Pending"
                                    ? "px-3 py-1 text-xs text-indigo-500 rounded-full  bg-indigo-100/60"
                                    : ""
                                }
                              ${
                                booking?.status == "Booked"
                                  ? "px-3 py-1 text-xs text-emerald-500 rounded-full  bg-emerald-100/60"
                                  : ""
                              }
                              ${
                                booking?.status == "Canceled"
                                  ? "px-3 py-1 text-xs text-pink-500 rounded-full  bg-pink-100/60"
                                  : ""
                              }
                              ${
                                booking?.status == "Reviewed"
                                  ? "px-3 py-1 text-xs text-indigo-500 rounded-full  bg-indigo-100/60"
                                  : ""
                              }`}
                              >
                                {booking?.status}
                              </p>
                            </div>
                          </td>
                          <td className="px-4 py-4 text-sm whitespace-nowrap">
                            <div className="flex items-center gap-x-6">
                              <button
                                disabled={
                                  booking?.status == "Booked" ||
                                  booking?.status == "Canceled" ||
                                  booking?.status == "Reviewed"
                                }
                                onClick={() =>
                                  handleCancelBooking(
                                    booking?._id,
                                    booking?.status,
                                    "Canceled",
                                    booking?.roomId,
                                    booking?.duration
                                  )
                                }
                                className=" disabled:cursor-not-allowed text-gray-500 transition-colors duration-200 dark:hover:text-red-500 dark:text-gray-300 hover:text-red-500 focus:outline-none"
                              >
                                <MdOutlineFreeCancellation
                                  title="Cancel Booking"
                                  size={20}
                                ></MdOutlineFreeCancellation>
                              </button>

                              <button
                                onClick={() => handleDelete(booking?._id)}
                                disabled={
                                  booking?.status == "Booked" ||
                                  booking?.status == "Pending" ||
                                  booking?.status == "Reviewed"
                                }
                                className="disabled:cursor-not-allowed text-gray-500 transition-colors duration-200 dark:hover:text-yellow-500 dark:text-gray-300 hover:text-yellow-500 focus:outline-none"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                  className="w-5 h-5"
                                >
                                  <path d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                </svg>
                              </button>
                              <button
                                className="disabled:cursor-not-allowed text-gray-500 transition-colors duration-200 dark:hover:text-yellow-500 dark:text-gray-300 hover:text-yellow-500 focus:outline-none"
                                title="Update"
                              
                              >
                                <Link to={`/bookingupdate/${booking?._id}`}>
                                  <CiSettings size={22}></CiSettings>
                                </Link>
                              </button>
                              <button
                                disabled={
                                  booking?.status == "Canceled" ||
                                  booking?.status == "Pending" ||
                                  booking?.status == "Reviewed"
                                }
                                onClick={() => {
                                  setOpenModal(true);
                                  setRoomName(booking?.roomName || "Unknown");
                                  setRoomId(booking?.roomId);
                                  setBookingID(booking?._id);
                                }}
                                title="Make Review"
                                className="disabled:cursor-not-allowed text-gray-500 transition-colors duration-200 dark:hover:text-yellow-500 dark:text-gray-300 hover:text-yellow-500 focus:outline-none"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                  className="w-5 h-5"
                                >
                                  <path d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                </svg>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {/* Review Modal */}
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="mx-auto flex w-72 items-center justify-center"
                  >
                    <div
                      onClick={() => setOpenModal(false)}
                      className={`fixed z-[100] flex items-center justify-center ${
                        openModal ? "opacity-1 visible" : "invisible opacity-0"
                      } inset-0 bg-black/20 backdrop-blur-sm duration-100`}
                    >
                      <div
                        onClick={(e_) => e_.stopPropagation()}
                        className={`absolute w-80 rounded-lg bg-white p-6 text-center drop-shadow-2xl  dark:text-white ${
                          openModal
                            ? "opacity-1 translate-y-0 duration-300"
                            : "translate-y-20 opacity-0 duration-150"
                        }`}
                      >
                        <div className="flex flex-col items-center justify-center space-y-4">
                          <svg
                            className="w-16 stroke-rose-600"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g strokeWidth="0"></g>
                            <g strokeLinecap="round" strokeLinejoin="round"></g>
                            <g>
                              <path
                                opacity="0.4"
                                d="M12 7.75V13"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              ></path>
                              <path
                                d="M21.0802 8.58003V15.42C21.0802 16.54 20.4802 17.58 19.5102 18.15L13.5702 21.58C12.6002 22.14 11.4002 22.14 10.4202 21.58L4.48016 18.15C3.51016 17.59 2.91016 16.55 2.91016 15.42V8.58003C2.91016 7.46003 3.51016 6.41999 4.48016 5.84999L10.4202 2.42C11.3902 1.86 12.5902 1.86 13.5702 2.42L19.5102 5.84999C20.4802 6.41999 21.0802 7.45003 21.0802 8.58003Z"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              ></path>
                              <path
                                opacity="0.4"
                                d="M12 16.2002V16.3002"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              ></path>
                            </g>
                          </svg>
                          <h6 className=" font-medium ">Make Your Review</h6>
                          <form action="" className="space-y-3">
                            <div className="">
                              <label className="text-gray-700 font-bold dark:text-gray-200">
                                Your Name
                              </label>
                              <input
                                type="text"
                                readOnly
                                name="reviewUserName"
                                defaultValue={user?.displayName || "Unknown"}
                                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                              />
                            </div>
                            <div className="">
                              <label className="text-gray-700 font-bold dark:text-gray-200">
                                Your Email
                              </label>
                              <input
                                type="text"
                                name="reviewUserEmail"
                                readOnly
                                defaultValue={user?.email}
                                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                                {...register("reviewUserEmail", {
                                  required: true,
                                })}
                              />
                              {errors.reviewUserEmail && (
                                <span className="text-red-500 font-semibold">
                                  Feild Is Required
                                </span>
                              )}
                            </div>
                            <div className="rating">
                              <input
                                type="radio"
                                name="rating-2"
                                className="mask mask-star-2 bg-orange-400"
                              />
                              <input
                                type="radio"
                                name="rating-2"
                                className="mask mask-star-2 bg-orange-400"
                                checked
                              />
                              <input
                                type="radio"
                                name="rating-2"
                                className="mask mask-star-2 bg-orange-400"
                              />
                              <input
                                type="radio"
                                name="rating-2"
                                className="mask mask-star-2 bg-orange-400"
                              />
                              <input
                                type="radio"
                                name="rating-2"
                                className="mask mask-star-2 bg-orange-400"
                              />
                            </div>
                            <select
                              className="select select-bordered w-full max-w-xs"
                              name="rating"
                              {...register("rating", { required: true })}
                            >
                              <option disabled selected>
                                Rating (Out Of 5)
                              </option>
                              <option>1</option>
                              <option>2</option>
                              <option>3</option>
                              <option>4</option>
                              <option>5</option>
                            </select>
                            {errors.rating && (
                              <span className="text-red-500 font-semibold">
                                Feild Is Required
                              </span>
                            )}
                            <div>
                              <label htmlFor="" className="font-semibold">
                                Write Your Review
                              </label>
                              <textarea
                                className="textarea textarea-success"
                                placeholder="Write your review"
                                name="reviewDescription"
                                {...register("reviewDescription", {
                                  required: true,
                                })}
                              ></textarea>
                            </div>
                            {errors.reviewDescription && (
                              <span className="text-red-500 font-semibold">
                                Feild Is Required
                              </span>
                            )}
                          </form>
                          <div className="flex gap-2">
                            <button
                              type="submit"
                              onClick={() => {
                                setOpenModal(false);
                              }}
                              className="rounded-md bg-indigo-600 px-6 py-2 text-sm text-white"
                            >
                              Make Review
                            </button>
                            <button
                              onClick={() => setOpenModal(false)}
                              className="rounded-md border border-rose-600 px-6 py-2 text-sm text-rose-600 hover:bg-rose-600 hover:text-white"
                            >
                              Not Now
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>

          <div
            id="grid-view"
            className={viewMode=='grid'?'my-5 max-w-5xl mx-auto md:my-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 lg:gap-5 place-items-center':'hidden'}
          >
            {bookings.map((booking) => (
              <BookingCard key={booking._id} booking={booking}></BookingCard>
            ))}
          </div>
        </section>
      )}
      {bookings.length == 0 && (
        <div className="space-y-3 flex flex-col justify-center items-center">
          <h1 className="text-2xl text-red-500 font-bold">
            <span className="text-pink-400">Dear, {user?.displayName},</span>
            There has no bookings yet
          </h1>
          <Link
            to="/rooms"
            className="btn  relative px-5 py-3 overflow-hidden font-medium text-gray-600 bg-gray-100 border border-gray-100 rounded-lg shadow-inner group"
          >
            <span className="absolute top-0 left-0 w-0 h-0 transition-all duration-200 border-t-2 border-gray-600 group-hover:w-full ease"></span>
            <span className="absolute bottom-0 right-0 w-0 h-0 transition-all duration-200 border-b-2 border-gray-600 group-hover:w-full ease"></span>
            <span className="absolute top-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-gray-600 group-hover:h-full ease"></span>
            <span className="absolute bottom-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-gray-600 group-hover:h-full ease"></span>
            <span className="absolute inset-0 w-full h-full duration-300 delay-300 bg-gray-900 opacity-0 group-hover:opacity-100"></span>
            <span className="relative transition-colors duration-300 delay-200 group-hover:text-white ease">
              Book A Room Now
            </span>
          </Link>
        </div>
      )}
    </div>
  );
};

export default MyBookings;
