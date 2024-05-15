import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className=" min-h-screen flex-col flex justify-center items-center">
      <Helmet>
        <title>Prebon Travels: Error Page</title>
      </Helmet>
      <h2 className="my-4 text-3xl font-bold">
        Ops! Sorry, Your requested content was not found!
      </h2>
      <Link
        to="/"
        className="relative inline-block px-4 py-2 font-medium group"
      >
        <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
        <span className="absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-black"></span>
        <span className="relative text-black group-hover:text-white">
          Back To Home
        </span>
      </Link>
      <img src="/error2.gif" alt="" />
    </div>
  );
};

export default ErrorPage;
