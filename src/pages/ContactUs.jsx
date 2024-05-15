import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { AuthContext } from "../contexts/AuthProvider";

const ContactUs = () => {
  const { user } = useContext(AuthContext);
  return (
    <div className="container mx-auto max-w-screen-xl my-5 md:my-10">
      <Helmet>
        <title>Contact Us</title>
      </Helmet>
      <div className="my-10">
        <hr className="my-3 border-gray-200  dark:border-gray-700" />
        <h2 className="text-center text-3xl font-semibold">Contact Us</h2>
        <p className="max-w-xl mx-auto opacity-90 text-center pt-2">
          Have questions, feedback, or inquiries? We'd love to hear from you!
          Feel free to reach out using the contact details below or fill out the
          contact form for a prompt response..
        </p>
        <hr className="my-3 border-gray-200  dark:border-gray-700" />
      </div>
      <div className="flex flex-col lg:flex-row items-center gap-4">
        <div className="basis-1/2">
          <img
            className="object-cover w-full "
            src="https://i.ibb.co/0yrXVgL/email-service-6431000-5314478.webp"
            alt=""
          />
        </div>
        <div className="basis-1/2  rounded-xl">
          <section className="max-w-4xl p-6 mx-auto bg-white rounded-md  ">
            <h2 className="text-lg  font-semibold text-gray-700 capitalize dark:text-white">
              Contact Us
            </h2>

            <form>
              <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                <div>
                  <label className="text-gray-700 dark:text-gray-200">
                    Name
                  </label>
                  <input
                    readOnly
                    defaultValue={user?.displayName}
                    type="text"
                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                  />
                </div>

                <div>
                  <label className="text-gray-700 dark:text-gray-200">
                    Email Address
                  </label>
                  <input
                    readOnly
                    defaultValue={user?.email}
                    type="email"
                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                  />
                </div>
                <div className="flex flex-col gap-2  w-[580px]">
                  <label className="text-gray-700 dark:text-gray-200 w-full">
                    Message
                  </label>
                  <textarea
                    name=""
                    id=""
                    rows={5}
                    placeholder="Your message"
                    className="w-full border p-3"
                  ></textarea>
                </div>
              </div>

              <div className="flex justify-end mt-6">
                <button
                  type="submit"
                  className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600 w-full"
                >
                  Send Us
                </button>
              </div>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
