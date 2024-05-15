import  { useState } from "react";
import { Map, Marker } from "pigeon-maps";
import { Link } from "react-router-dom";

const HomeMap = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="my-5 md:my-10">
      <section className="bg-white">
        <div className="container px-6 py-16 mx-auto text-center">
          <div className="max-w-lg mx-auto">
            <h1 className="text-3xl font-semibold text-gray-800 dark:text-white lg:text-4xl">
              Discover our hotel's prime location!
            </h1>
            <p className="mt-6 text-gray-500 dark:text-gray-300">
              Explore the convenience of staying at PrebonHotel, strategically
              situated at: Dhaka,Bangladesh Plan your visit and experience
              exceptional hospitality in the heart of Dhaka.
            </p>
            <button className="px-5 py-2 mt-6 text-sm font-medium leading-5 text-center text-white capitalize bg-blue-600 rounded-lg hover:bg-blue-500 lg:mx-0 lg:w-auto focus:outline-none">
              <Link to='/rooms'>Book Room</Link>
            </button>
          </div>

          <div className="flex max-w-5xl mx-auto justify-center mt-10">
            <Map
              height={400}
              style={{  overflow: "hidden" }}
              defaultCenter={[23.7957, 90.3535]}
              defaultZoom={11}
            >
              <Marker width={50} anchor={[23.7957, 90.3535]} />
            </Map>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomeMap;
