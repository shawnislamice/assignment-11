import { Typewriter } from "react-simple-typewriter";
import { useContext, useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { Helmet } from "react-helmet-async";
import { AuthContext } from "../contexts/AuthProvider";
import HomeMap from "../components/HomeMap";
import Newsletter from "../components/Newsletter";

import useAxiosSecure from "../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import RoomCard from "../components/RoomCard";
import { Link } from "react-router-dom";
import Reviews from "../components/Reviews";
import PricingOffer from "../components/PricingOffer";
const Home = () => {
  
  const { name } = useContext(AuthContext);

  const handleType = (number) => {
    // access word count number
    console.log();
  };

  const handleDone = () => {
    console.log(`Done after 5 loops!`);
  };
  const [startDate, setStartDate] = useState(new Date());
  const [startDate2, setStartDate2] = useState(new Date());
  const axiosSecure = useAxiosSecure();
  const {
    data: rooms = [],
    isLoading,
    error,
    isError,
    refetch,
  } = useQuery({
    queryFn: () => getData(),
    queryKey: ["rooms-home"],
  });
  const getData = async () => {
    const { data } = await axiosSecure.get("/rooms");
    return data;
  };
  refetch();
 
  return (
    <div className="">
      <div data-aos='fade-up' className=" lg:mb-20 mb-5  relative bg-[url('/slide_1.jpg')] bg-cover   bg-center bg-no-repeat  min-h-[600px]">
        <Helmet>
          <title>Home: PrebonHotel</title>
        </Helmet>
        <div className="flex flex-col justify-center items-center gap-3 md:gap-5 md:pt-40 pt-20">
          <h1
            className="text-2xl md:text-3xl lg:text-5xl text-black font-bold"
            style={{
              paddingTop: "5rem",
              margin: "auto 0",
              fontWeight: "bold",
            }}
          >
            Welcome To{" "}
            <span
              data-aos="fade-up"
              style={{ color: "red", fontWeight: "bold" }}
            >
              {/* Style will be inherited from the parent element */}
              <Typewriter
                words={[
                  "Prebon Hotels",
                  "Enjoy Your Weekend With Us",
                  "We Love",
                  "We Care",
                ]}
                loop={true}
                cursor
                cursorStyle="_"
                typeSpeed={70}
                deleteSpeed={50}
                delaySpeed={2000}
                onLoopDone={handleDone}
                onType={handleType}
              />
            </span>
          </h1>
          
          <button className=" relative  inline-flex items-center justify-start py-3 pl-4 pr-12 overflow-hidden font-semibold text-indigo-600 transition-all duration-150 ease-in-out rounded hover:pl-10 hover:pr-6 bg-gray-50 group">
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
            <span className="absolute  left-0 pl-2.5 -translate-x-12 group-hover:translate-x-0 ease-out duration-200">
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
              Explore Now
            </span>
          </button>
          <div data-aos='zoom-in' className="bg-white shadow-md rounded-lg p-8  md:absolute -bottom-[10%] flex-col md:flex-row lg:flex md:hidden justify-center md:justify-around items-center gap-4 mb-4 md:mb-0">
            <div className="flex flex-col gap-2">
              <label htmlFor="" className="font-semibold">
                Check In
              </label>
              <DatePicker
                className="input bg-base-200"
                selected={startDate}
                onChange={(date) => setStartDate(date)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="" className="font-semibold">
                Check Out
              </label>
              <DatePicker
                className="input bg-base-200"
                selected={startDate2}
                onChange={(date2) => setStartDate2(date2)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="" className="font-semibold">
                Adults
              </label>
              <input
                type="text"
                className="bg-base-200 input"
                placeholder="No of Adults"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="" className="font-semibold">
                Child
              </label>
              <input
                type="text"
                className="bg-base-200 input"
                placeholder="No of Child"
              />
            </div>
            <button
              href="#_"
              className="px-5  py-2.5 relative top-4 rounded group overflow-hidden font-medium bg-purple-50 text-purple-600 block md:inline-block mx-auto"
            >
              <span className="absolute top-0 left-0 flex w-full h-0 mb-0 transition-all duration-200 ease-out transform translate-y-0 bg-purple-600 group-hover:h-full opacity-90"></span>
              <span className="relative group-hover:text-white">
                Search Now
              </span>
            </button>
          </div>
        </div>
      </div>
      <div  className="pt-2 container mx-auto max-w-screen-xl">
        <hr className="my-3 border-gray-200  dark:border-gray-700" />
        <h2 className="text-center text-3xl font-semibold">Rooms</h2>
        <p className="max-w-xl mx-auto opacity-90 text-center pt-2">
          Celebrate life's moments in our exclusive suites, designed for
          unforgettable experiences. From breathtaking views to personalized
          service, our best rooms redefine luxury.
        </p>
        <hr className="my-3 border-gray-200  dark:border-gray-700" />
      </div>
      <div className="pt-2 grid md:grid-cols-2 lg:grid-cols-3 place-items-center grid-cols-1 max-w-6xl mx-auto gap-3 md:gap-4 lg:gap-6">
        {rooms.splice(0, 6).map((room) => (
          <RoomCard room={room} key={room?._id}></RoomCard>
        ))}
      </div>

      <button className="block mx-auto">
        <Link
          to="/rooms"
          className=" relative top-8 block  rounded px-5 py-2.5 overflow-hidden group bg-green-500  hover:bg-gradient-to-r hover:from-green-500 hover:to-green-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-green-400 transition-all ease-out duration-300"
        >
          <span className=" absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
          <span className="relative">Show All</span>
        </Link>
      </button>
      <HomeMap></HomeMap>

      <Newsletter></Newsletter>
      <PricingOffer></PricingOffer>
      <Reviews></Reviews>
    </div>
  );
};

export default Home;
