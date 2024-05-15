import { CiSettings } from "react-icons/ci";
import { MdOutlineFreeCancellation } from "react-icons/md";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useContext,  useState } from "react";
import { AuthContext } from "../contexts/AuthProvider";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";
import Spinner from "../components/Spinner";

const BookingCard = ({ booking }) => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const [openModal, setOpenModal] = useState(false);
  const [roomName, setRoomName] = useState("");
  const [roomId, setRoomId] = useState(null);
  const [bookingId, setBookingID] = useState(null);

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

  return (
    <div>
      <div className="my-3 hover:scale-95 duration-500 hover:bg-[#A0DEFF] p-4 w-full max-w-sm px-4 py-3 bg-white rounded-md shadow-md dark:bg-gray-800">
        <Helmet>
          <title>Prebon Hotels: {booking?.roomName}</title>
        </Helmet>
        <div className="flex items-center justify-between">
          <span className="text-sm font-light text-gray-800 dark:text-gray-400">
            {booking?.roomType || "Unknown"}
          </span>
          <span
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
            {booking?.status || "Unknown"}
          </span>
        </div>

        <div>
          <h1 className="mt-2 text-lg font-semibold text-gray-800 dark:text-white">
            {booking?.roomName}
          </h1>
          <p className="mt-2 text-sm flex items-center justify-between text-gray-600 dark:text-gray-300">
            <p>
              <b>Check In:</b> {new Date(booking?.checkIn).toLocaleDateString()}
            </p>
            <p>
              <b>Check Out:</b>{" "}
              {new Date(booking?.checkOut).toLocaleDateString()}
            </p>
          </p>
        </div>

        <p className="mt-3">Actions</p>
        <div className="my-4 flex items-center gap-x-6">
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
            disabled={
              booking?.status == "Booked" ||
              booking?.status == "Canceled" ||
              booking?.status == "Reviewed"
            }
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
      </div>
    </div>
  );
};

export default BookingCard;
