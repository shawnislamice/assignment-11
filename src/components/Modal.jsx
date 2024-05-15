import { useContext, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { useForm } from "react-hook-form";

import "react-datepicker/dist/react-datepicker.css";
import toast from "react-hot-toast";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthProvider";
import { Helmet } from "react-helmet-async";
const Modal = ({ room }) => {
  const [openModal, setOpenModal] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [startDate2, setStartDate2] = useState(new Date());
  const [demoData, setDemodata] = useState(null);
  let startDateTime = startDate.getTime();
  let endDateTime = startDate2.getTime();
  let difference = Math.abs(endDateTime - startDateTime);
  let differnceInDays = Math.round(difference / (1000 * 3600 * 24));
 
  let tax =
    parseFloat(room?.price_per_night) * parseInt(differnceInDays) * 0.13;
  let totalCost =
    parseFloat(room?.price_per_night) * parseInt(differnceInDays) +
    parseFloat(room?.price_per_night) * parseInt(differnceInDays) * 0.13;
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (openModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflowY = "auto";
    }
    return () => (document.body.style.overflow = "auto");
  }, [openModal]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const checkIn = startDate;
    const checkOut = startDate2;
    const duration = differnceInDays;
    let roomType = room?.room_type;
    const price=room?.price_per_night
    const status = "Pending";
    const roomId = room?._id;
    const sellerName = room?.seller?.sellerName;
    const sellerEmail = room?.seller?.sellerEmail;
    if (sellerEmail == user?.email) {
      toast.error("You Can to Book Your Own Posted Room Bookings!");
      return;
    }
    const seller = { sellerName, sellerEmail };
    const roomName = room?.room_name;
    setDemodata(data);
    const newData = {
      ...data,
      checkIn,
      checkOut,
      tax,
      totalCost,
      roomType,
      status,
      roomId,
      seller,
      roomName,
      duration,
      price
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
        title: "Are you sure?",
        text: "You are going to book this room!",
        icon: "info",
        showCancelButton: true,
        confirmButtonText: "Confirm Booking",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          axiosSecure.post("/bookings", newData).then((res) => {
            console.log(res.data);
            swalWithBootstrapButtons.fire({
              title: "Order Placed Successfully",
              text: "Your will get a order confirmation message in your email!",
              icon: "success",
            });
            // Update
            const currentAvilability = "false";
            axiosSecure
              .put(`rooms/${room?._id}`, { currentAvilability })
              .then((res) => console.log(res.data));
            // Update
            navigate("/mybookings");
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

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="px-4 md:px-0">
      {/* Pay Button */}
      <Helmet>
        <title>Prebon Hotels: {room?.room_name}</title>
      </Helmet>
      <button
        disabled={room?.availability === "false"}
        onClick={() => setOpenModal(true)}
        className="mt-4 relative left-0 disabled:cursor-not-allowed inline-flex items-center justify-start py-3 pl-4 pr-12 overflow-hidden font-semibold text-indigo-600 transition-all duration-150 ease-in-out rounded hover:pl-10 hover:pr-6 bg-gray-50 group"
      >
        <span className="absolute bottom-0 left-0 w-full h-1 transition-all duration-150 ease-in-out bg-indigo-600 group-hover:h-full"></span>
        <span className="absolute right-0 pr-4 duration-200 ease-out group-hover:translate-x-12">
          <svg
            className="w-5 h-5 text-green-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
          </svg>
        </span>
        <span className="absolute left-0 pl-2.5 -translate-x-12 group-hover:translate-x-0 ease-out duration-200">
          <svg
            className="w-5 h-5 text-green-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
          </svg>
        </span>
        <span className="relative w-full text-left transition-colors duration-200 ease-in-out group-hover:text-white">
          Book Now
        </span>
      </button>
      <div
        className={`fixed flex justify-center items-center z-[100] ${
          openModal ? "visible opacity-1" : "invisible opacity-0"
        } duration-300 inset-0 w-full h-full`}
      >
        <div
          onClick={(e_) => e_.stopPropagation()}
          className={`absolute overflow-x-hidden overflow-y-scroll w-full h-full flex justify-center bg-white drop-shadow-2xl rounded-lg ${
            openModal
              ? "translate-y-0 opacity-1 duration-300"
              : "translate-y-32 opacity-0 duration-100"
          }`}
        >
          <main className="px-4 sm:px-6 lg:px-8 py-8">
            <button
              onClick={() => {
                setOpenModal(false);
              }}
              className="mr-0 mx-auto flex bg-slate-950 text-white px-3 py-2 rounded-lg mb-6"
            >
              Close
            </button>
            <div className="grid gap-8 lg:grid-cols-2">
              <div className="space-y-8 lg:mb-6">
                <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
                  <div className="flex flex-col space-y-1.5 lg:p-6 p-2">
                    <h3 className="text-2xl font-semibold whitespace-nowrap">
                      Booking Details
                    </h3>
                  </div>
                  <div className="lg:p-6 p-2">
                    {/* Shipping Details form */}
                    <form className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Name</label>
                        <input
                          readOnly
                          className="bg-transparent flex h-10 w-full rounded-md border px-3"
                          placeholder="Enter your name"
                          name="customerName"
                          defaultValue={user?.displayName}
                          {...register("customerName")}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Email</label>
                        <input
                          readOnly
                          className="bg-transparent flex h-10 w-full rounded-md border px-3"
                          placeholder="Enter your email"
                          name="customerEmail"
                          defaultValue={user?.email}
                          {...register("customerEmail")}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Address</label>
                        <input
                          className="bg-transparent flex h-10 w-full rounded-md border px-3"
                          placeholder="Enter your address"
                          name="customerAddress"
                          {...register("customerAddress", { required: true })}
                        />
                        {errors.customerAddress && (
                          <span className="font-semibold text-red-500">
                            Feild is Required
                          </span>
                        )}
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">Country</label>
                        <input
                          className="bg-transparent flex h-10 w-full rounded-md border px-3"
                          placeholder="Enter your country"
                          name="customerCountry"
                          {...register("customerCountry", { required: true })}
                        />
                        {errors.customerCountry && (
                          <span className="font-semibold text-red-500">
                            Feild is Required
                          </span>
                        )}
                      </div>
                      <div className="flex items-center justify-between md:pt-3">
                        <div className="flex flex-col gap-2">
                          <label htmlFor="" className="text-sm font-medium">
                            Check In
                          </label>
                          <DatePicker
                            className=""
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                          />
                        </div>
                        <div className="flex flex-col gap-2">
                          <label htmlFor="" className="text-sm font-medium">
                            Check Out
                          </label>
                          <DatePicker
                            className=""
                            selected={startDate2}
                            onChange={(date2) => setStartDate2(date2)}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Adults</label>
                        <input
                          className="bg-transparent flex h-10 w-full rounded-md border px-3"
                          placeholder="Number of Adults"
                          name="noOfAdults"
                          {...register("noOfAdults", { required: true })}
                        />
                        {errors.noOfAdults && (
                          <span className="font-semibold text-red-500">
                            Feild is Required
                          </span>
                        )}
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Children</label>
                        <input
                          className="bg-transparent flex h-10 w-full rounded-md border px-3"
                          placeholder="Number of Children"
                          name="noOfChild"
                          {...register("noOfChild", { required: true })}
                        />
                        {errors.noOfChild && (
                          <span className="font-semibold text-red-500">
                            Feild is Required
                          </span>
                        )}
                      </div>
                    </form>
                  </div>
                </div>
                <div className="rounded-lg border bg-card  shadow-sm ">
                  <div className="flex flex-col space-y-1.5 lg:p-6 p-2">
                    <h3 className="text-2xl font-semibold whitespace-nowrap">
                      Payment Information
                    </h3>
                  </div>
                  <div className="lg:p-6 p-2">
                    {/* Personal Information details form */}
                    <form className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium leading-none">
                          Card Number
                        </label>
                        <input
                          className="bg-transparent flex h-10 w-full rounded-md border px-3"
                          placeholder="Enter your card number"
                          name="cardNumber"
                          {...register("cardNumber", { required: true })}
                        />
                        {errors.cardNumber && (
                          <span className="font-semibold text-red-500">
                            Feild is Required
                          </span>
                        )}
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium leading-none">
                            Expiry Date
                          </label>
                          <input
                            className="bg-transparent flex h-10 w-full rounded-md border px-3"
                            placeholder="MM/YY"
                            name="expiryDate"
                            {...register("expiryDate", { required: true })}
                          />
                          {errors.expiryDate && (
                            <span className="font-semibold text-red-500">
                              Feild is Required
                            </span>
                          )}
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium leading-none">
                            CVV
                          </label>
                          <input
                            className="bg-transparent flex h-10 w-full rounded-md border px-3"
                            placeholder="Enter your CVV"
                            name="cvv"
                            {...register("cvv", { required: true })}
                          />
                          {errors.cvv && (
                            <span className="font-semibold text-red-500">
                              Feild is Required
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium leading-none">
                          Billing Address
                        </label>
                        <input
                          className="bg-transparent flex h-10 w-full rounded-md border px-3"
                          placeholder="Enter your billing address"
                          name="billingAddress"
                          {...register("billingAddress", { required: true })}
                        />
                        {errors.billingAddress && (
                          <span className="font-semibold text-red-500">
                            Feild is Required
                          </span>
                        )}
                      </div>
                    </form>
                  </div>
                </div>
              </div>

              <div className="space-y-8 lg:mb-0 mb-6">
                <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
                  <div className="flex flex-col space-y-1.5 lg:p-6 p-2">
                    <h3 className="text-2xl font-semibold whitespace-nowrap">
                      Order Summary
                    </h3>
                  </div>
                  {/* Checkout form */}
                  <div className="lg:p-6 p-2">
                    <div className="flex flex-col justify-end items-end my-3 space-y-2">
                      <p>
                        <b>Room Name:</b> {room?.room_name}
                      </p>
                      <p>
                        <b>Check In:</b> {new Date(startDate).toLocaleDateString()}
                      </p>
                      <p>
                        <b>Check Out:</b> {new Date(startDate2).toLocaleDateString()}
                      </p>
                      <p>
                        <b>Room Type:</b> {room?.room_type}
                      </p>
                      <p>
                        <b>Length:</b> {room?.sqft} Squareft
                      </p>
                    </div>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span>
                          Total {differnceInDays} <b>Days</b>
                        </span>
                        <span>
                          $
                          {parseFloat(room?.price_per_night) *
                            parseInt(differnceInDays)}
                        </span>
                      </div>

                      <div className="border-t border-gray-200  mt-4 pt-4 flex justify-between ">
                        <span>VAT</span>
                        <span>
                          $
                          {parseFloat(room?.price_per_night) *
                            parseInt(differnceInDays) *
                            0.13}
                        </span>
                      </div>
                      <div className="border-t border-gray-200  mt-4 pt-4 flex justify-between font-semibold">
                        <span>Total</span>
                        <span>
                          $
                          {parseFloat(room?.price_per_night) *
                            parseInt(differnceInDays) +
                            parseFloat(room?.price_per_night) *
                              parseInt(differnceInDays) *
                              0.13}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center lg:p-6 p-2">
                    <button
                      type="submit"
                      className="inline-flex items-center bg-slate-950 text-white justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full"
                    >
                      Complete Purchase
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </form>
  );
};

export default Modal;
