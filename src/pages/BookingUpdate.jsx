import { useLoaderData, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthProvider";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import toast from "react-hot-toast";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";
const BookingUpdate = () => {
  const booking = useLoaderData();
  const { user } = useContext(AuthContext);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  let startDateTime = startDate.getTime();
  let endDateTime = endDate.getTime();
  let difference = Math.abs(endDateTime - startDateTime);
  let differnceInDays = Math.round(difference / (1000 * 3600 * 24));
  const pricePerNight = parseFloat(booking?.price);
  const newTotal = parseInt(differnceInDays) * pricePerNight;
  const newTax = newTotal * 0.13;
  const newTotalCost = newTotal + newTax;
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
  const [openModal, setOpenModal] = useState(false);

  const onSubmit = async (data) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: "Are you sure? You want to update this information!",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, Update it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          const newData = {
            startDate,
            endDate,
            newTotal,
            newTax,
            newTotalCost,
          };
          try {
            const { data } = axiosSecure.put(
              `/newbookings/${booking?._id}`,
              newData
            );
            console.log(data);
            swalWithBootstrapButtons.fire({
              title: "Updated!",
              text: "Your booking has been updated.",
              icon: "success",
            });
            navigate("/mybookings", { replace: true });
          } catch (error) {
            toast.error(error.message);
          }
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
        <title>Prebon Hotels: Booking Update</title>
      </Helmet>
      <section className="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">
        <h2 className="text-lg font-semibold text-gray-700 capitalize dark:text-white">
          Update Room Now
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
                defaultValue={booking?.roomName}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                readOnly
              />
            </div>

            <div>
              <label className="text-gray-700 dark:text-gray-200">
                Room Category
              </label>
              <select
                className="  select select-bordered select-sm w-full max-w-xl h-[40px] top-2 relative"
                name="room_type"
                defaultValue={booking?.roomType}
                readOnly
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
            </div>
            <div>
              <label className="text-gray-700 dark:text-gray-200">
                Total Cost
              </label>
              <input
                type="text"
                name="totalCost"
                defaultValue={`${booking?.totalCost} $`}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                readOnly
              />
            </div>

            <div>
              <label className="text-gray-700 dark:text-gray-200">Tax</label>
              <input
                type="text"
                defaultValue={`${booking?.tax} $`}
                name="tax"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                readOnly
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-gray-700 dark:text-gray-200">
                Check In
              </label>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                className="input"
                defaultValue={new Date(booking?.checkIn).toLocaleDateString()}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-gray-700 dark:text-gray-200">
                Check Out
              </label>
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                className="input"
                defaultValue={new Date(booking?.checkOut).toLocaleDateString()}
              />
            </div>
            <div
              onClick={() => setOpenModal(false)}
              className={`fixed z-[100] flex items-center justify-center ${
                openModal ? "visible opacity-100" : "invisible opacity-0"
              } inset-0 bg-black/20 backdrop-blur-sm duration-100 dark:bg-transparent`}
            >
              <div
                onClick={(e_) => e_.stopPropagation()}
                className={`text- absolute max-w-md rounded-lg bg-white p-6 drop-shadow-lg dark:bg-gray-800 dark:text-white ${
                  openModal
                    ? "scale-1 opacity-1 duration-300"
                    : "scale-0 opacity-0 duration-150"
                }`}
              >
                <h1 className="mb-2 text-2xl font-semibold">
                  See Your Update Summary!
                </h1>
                <div className="p-6  space-y-2">
                  <p>
                    <b>Previous Check In Date: </b>
                    <span className="text-red-500">
                      {" "}
                      {new Date(booking?.checkIn).toLocaleDateString()}
                    </span>
                  </p>
                  <p>
                    <b>New Check In Date: </b>
                    <span className="text-emerald-500">
                      {" "}
                      {new Date(startDate).toLocaleDateString()}
                    </span>
                  </p>
                  <p>
                    <b>Previous Check Out Date: </b>
                    <span className="text-red-500">
                      {new Date(booking?.checkOut).toLocaleDateString()}
                    </span>
                  </p>
                  <p>
                    <b>New Check Out Date: </b>
                    <span className="text-emerald-500">
                      {" "}
                      {new Date(endDate).toLocaleDateString()}
                    </span>
                  </p>
                  <p>
                    <b>New Total Cost: </b>
                    {newTotal}$
                  </p>
                  <p>
                    <b>New Tax: </b>
                    {newTax}$
                  </p>
                  <p>
                    <b>Total Payable: </b>
                    {newTax + newTotal}$
                  </p>
                </div>
                <div className="flex justify-between">
                  <button
                    type="submit"
                    onClick={() => {
                      setOpenModal(true);
                    }}
                    className="me-2 rounded-md bg-indigo-600 hover:bg-indigo-700 px-6 py-[6px] text-white"
                  >
                    Update
                  </button>
                  <span
                    onClick={() => setOpenModal(false)}
                    className="rounded-md border border-rose-600 px-6 py-[6px] text-rose-600 duration-150 hover:bg-rose-600 hover:text-white"
                  >
                    Cancel
                  </span>
                </div>
              </div>
            </div>
          </div>
        </form>
        <div className="flex justify-end mt-6">
          <button
            onClick={() => setOpenModal(true)}
            className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
          >
            Update Now
          </button>
        </div>
        {/* <div className="p-6  space-y-2">
          <h2 className="text-center font-semibold">Updated Order Summary</h2>
          <p>
            <b>Previous Check In Date: </b>
            {new Date(booking?.checkIn).toLocaleDateString()}
          </p>
          <p>
            <b>New Check In Date: </b>
            {new Date(startDate).toLocaleDateString()}
          </p>
          <p>
            <b>Previous Check Out Date: </b>
            {new Date(booking?.checkOut).toLocaleDateString()}
          </p>
          <p>
            <b>New Check Out Date: </b>
            {new Date(endDate).toLocaleDateString()}
          </p>
          <p>
            <b>New Total Cost: </b>
            {newTotal}$
          </p>
          <p>
            <b>New Tax: </b>
            {newTax}$
          </p>
          <p>
            <b>Total Payable: </b>
            {newTax + newTotal}$
          </p>
        </div> */}
        {/* <div
          onClick={() => setOpenModal(false)}
          className={`fixed z-[100] flex items-center justify-center ${
            openModal ? "visible opacity-100" : "invisible opacity-0"
          } inset-0 bg-black/20 backdrop-blur-sm duration-100 dark:bg-transparent`}
        >
          <div
            onClick={(e_) => e_.stopPropagation()}
            className={`text- absolute max-w-md rounded-lg bg-white p-6 drop-shadow-lg dark:bg-gray-800 dark:text-white ${
              openModal
                ? "scale-1 opacity-1 duration-300"
                : "scale-0 opacity-0 duration-150"
            }`}
          >
            <h1 className="mb-2 text-2xl font-semibold">
              See Your Update Summary!
            </h1>
            <div className="p-6  space-y-2">
              <p>
                <b>Previous Check In Date: </b>
                <span className="text-red-500">
                  {" "}
                  {new Date(booking?.checkIn).toLocaleDateString()}
                </span>
              </p>
              <p>
                <b>New Check In Date: </b>
                <span className="text-emerald-500">
                  {" "}
                  {new Date(startDate).toLocaleDateString()}
                </span>
              </p>
              <p>
                <b>Previous Check Out Date: </b>
                <span className="text-red-500">
                  {new Date(booking?.checkOut).toLocaleDateString()}
                </span>
              </p>
              <p>
                <b>New Check Out Date: </b>
                <span className="text-emerald-500">
                  {" "}
                  {new Date(endDate).toLocaleDateString()}
                </span>
              </p>
              <p>
                <b>New Total Cost: </b>
                {newTotal}$
              </p>
              <p>
                <b>New Tax: </b>
                {newTax}$
              </p>
              <p>
                <b>Total Payable: </b>
                {newTax + newTotal}$
              </p>
            </div>
            <div className="flex justify-between">
              <button
                type="submit"
                onClick={() => {
                  setOpenModal(true);
                  handleSubmit(onSubmit);
                }}
                className="me-2 rounded-md bg-indigo-600 hover:bg-indigo-700 px-6 py-[6px] text-white"
              >
                Update
              </button>
              <button
                onClick={() => setOpenModal(false)}
                className="rounded-md border border-rose-600 px-6 py-[6px] text-rose-600 duration-150 hover:bg-rose-600 hover:text-white"
              >
                Cancel
              </button>
            </div>
          </div>
        </div> */}
      </section>
    </div>
  );
};

export default BookingUpdate;
