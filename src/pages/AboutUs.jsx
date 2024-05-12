
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthProvider";
import { Helmet } from "react-helmet-async";
const About = () => {
  const { user } = useContext(AuthContext);
  console.log(user);
  



  return (
    <div>
      <Helmet>
        <title>About Us</title>
      </Helmet>
      <section className="dark:bg-gray-100 dark:text-gray-800">
        <div className="container flex flex-col justify-center p-4 mx-auto md:p-8">
          <h2
            data-aos="fade-up"
            data-aos-delay="900"
            data-aos-anchor="faq-anchor"
            className="mb-12 text-4xl font-bold leading-none text-center sm:text-5xl"
          >
            Frequently Asked Questions
          </h2>
          <div className="flex flex-col divide-y sm:px-8 lg:px-12 xl:px-32 dark:divide-gray-300">
            <details
              data-aos="fade-up"
              data-aos-delay="800"
              data-aos-anchor="faq-anchor"
            >
              <summary className="py-2 outline-none cursor-pointer focus:underline">
                What are your check-in and check-out times?
              </summary>
              <div className="px-4 pb-4">
                <p>
                  Provide details about your standard check-in and check-out
                  times, as well as any options for early check-in or late
                  check-out.
                </p>
              </div>
            </details>
            <details
              open=""
              data-aos="fade-up"
              data-aos-delay="700"
              data-aos-anchor="faq-anchor"
            >
              <summary className="py-2 outline-none cursor-pointer focus:underline">
                Do you offer airport shuttle services?
              </summary>
              <div className="px-4 pb-4">
                <p>
                  Explain if your hotel provides transportation to and from the
                  airport, and how guests can arrange for this service.
                </p>
              </div>
            </details>
            <details
              data-aos="fade-up"
              data-aos-delay="700"
              data-aos-anchor="faq-anchor"
            >
              <summary className="py-2 outline-none cursor-pointer focus:underline">
                What amenities are included with my stay?
              </summary>
              <div className="px-4 pb-4 space-y-2">
                <p>
                  List amenities such as complimentary breakfast, Wi-Fi,
                  parking, gym access, pool facilities, etc.
                </p>
              </div>
            </details>
            <details
              data-aos="fade-up"
              data-aos-delay="600"
              data-aos-anchor="faq-anchor"
            >
              <summary className="py-2 outline-none cursor-pointer focus:underline">
                How do I modify or cancel my reservation?
              </summary>
              <div className="px-4 pb-4 space-y-2">
                <p>
                  Explain your hotel's cancellation policy and provide
                  instructions on how guests can modify or cancel their
                  bookings.
                </p>
              </div>
            </details>
            <details
              data-aos="fade-up"
              data-aos-delay="500"
              data-aos-anchor="faq-anchor"
            >
              <summary className="py-2 outline-none cursor-pointer focus:underline">
                Do you have rooms with accessible facilities?
              </summary>
              <div className="px-4 pb-4 space-y-2">
                <p>
                  Inform guests about accessible rooms or facilities for those
                  with mobility challenges.
                </p>
              </div>
            </details>
            <details
              data-aos="fade-up"
              data-aos-delay="400"
              data-aos-anchor="faq-anchor"
            >
              <summary className="py-2 outline-none cursor-pointer focus:underline">
                Is there a restaurant on-site?
              </summary>
              <div className="px-4 pb-4 space-y-2">
                <p>
                  Describe any dining options available within the hotel
                  premises.
                </p>
              </div>
            </details>
            <details
              data-aos="fade-up"
              data-aos-delay="300"
              data-aos-anchor="faq-anchor"
            >
              <summary className="py-2 outline-none cursor-pointer focus:underline">
                What is your pet policy?
              </summary>
              <div className="px-4 pb-4 space-y-2">
                <p>
                  Provide information on how guests can request extra services
                  such as room service, laundry, or special arrangements.
                </p>
              </div>
            </details>
            <details
              data-aos="fade-up"
              data-aos-delay="200"
              data-aos-anchor="faq-anchor"
            >
              <summary className="py-2 outline-none cursor-pointer focus:underline">
                Is there parking available?
              </summary>
              <div className="px-4 pb-4 space-y-2">
                <p>
                  Detail parking options, including whether it's free or paid
                  and whether reservations are required.
                </p>
              </div>
            </details>
            <details
              data-aos="fade-up"
              data-aos-delay="100"
              data-aos-anchor="faq-anchor"
            >
              <summary className="py-2 outline-none cursor-pointer focus:underline">
                How far is the hotel from popular attractions or landmarks?{" "}
              </summary>
              <div className="px-4 pb-4 space-y-2">
                <p>
                  Offer details on nearby points of interest, transportation
                  options, and distances from key destinations.
                </p>
              </div>
            </details>
            <details data-aos="fade-up" data-anchor="faq-anchor">
              <summary className="py-2 outline-none cursor-pointer focus:underline">
                Do you provide special packages or promotions?
              </summary>
              <div className="px-4 pb-4 space-y-2">
                <p>
                  Highlight any current deals, discounts, or special packages
                  available to guests.
                </p>
              </div>
            </details>
          </div>
          <div id="faq-anchor"></div>
        </div>
      </section>
      <section className="dark:bg-gray-100 dark:text-gray-800">
        <div className="container max-w-xl p-6 py-12 mx-auto space-y-24 lg:px-8 lg:max-w-7xl">
          <div data-aos-anchor="commitment-anchor">
            <h2
              data-aos="fade-down"
              data-aos-anchor-placement="center"
              data-aos-delay="1700"
              className="text-3xl font-bold tracking-tight text-center sm:text-5xl dark:text-gray-900"
            >
              Commitments and Services
            </h2>
            <p
              data-aos="zoom-in"
              data-aos-anchor="commitment-anchor"
              data-aos-delay="1100"
              className="max-w-3xl mx-auto mt-4 text-xl text-center dark:text-gray-600"
            >
              Our commitment is our Service
            </p>
          </div>
          <div
            data-aos-anchor="commitment-anchor"
            className="grid lg:gap-8 lg:grid-cols-2 lg:items-center"
          >
            <div
              data-aos="fade-left"
              data-aos-anchor="commitment-anchor"
              data-aos-delay="1500"
              data-aos-duration="1200"
            >
              <h3 className="text-2xl font-bold tracking-tight sm:text-3xl dark:text-gray-900">
                Commitments
              </h3>
              <p className="mt-3 text-lg dark:text-gray-600">
                We are driven by a steadfast commitment to excellence in
                everything we do. Quality assurance is at the core of our
                operations, as we meticulously test and inspect each product to
                ensure it meets our stringent standards. But our dedication
                extends beyond product quality
              </p>
              <div className="mt-12 space-y-12">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center w-12 h-12 rounded-md dark:bg-violet-600 dark:text-gray-50">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="w-7 h-7"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        ></path>
                      </svg>
                    </div>
                  </div>
                  <div
                    className="ml-4"
                    data-aos="fade-up"
                    data-aos-anchor="commitment-anchor"
                    data-aos-delay="1300"
                  >
                    <h4 className="text-lg font-medium leading-6 dark:text-gray-900">
                      Quality Assurance
                    </h4>
                    <p className="mt-2 dark:text-gray-600">
                      We are committed to delivering products/services of the
                      highest quality, consistently meeting or exceeding
                      industry standards.
                    </p>
                  </div>
                </div>
                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center w-12 h-12 rounded-md dark:bg-violet-600 dark:text-gray-50">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="w-7 h-7"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        ></path>
                      </svg>
                    </div>
                  </div>
                  <div
                    className="ml-4"
                    data-aos="fade-up"
                    data-aos-anchor="commitment-anchor"
                    data-aos-delay="1200"
                  >
                    <h4 className="text-lg font-medium leading-6 dark:text-gray-900">
                      Customer Satisfaction
                    </h4>
                    <p className="mt-2 dark:text-gray-600">
                      Our customers are our top priority. We are dedicated to
                      providing exceptional service, listening to our customers'
                      needs, and exceeding their expectations.
                    </p>
                  </div>
                </div>
                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center w-12 h-12 rounded-md dark:bg-violet-600 dark:text-gray-50">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="w-7 h-7"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        ></path>
                      </svg>
                    </div>
                  </div>
                  <div
                    className="ml-4"
                    data-aos="fade-up"
                    data-aos-anchor="commitment-anchor"
                    data-aos-delay="1100"
                  >
                    <h4 className="text-lg font-medium leading-6 dark:text-gray-900">
                      Transparency
                    </h4>
                    <p className="mt-2 dark:text-gray-600">
                      We believe in transparency in all our interactions. We
                      commit to open communication, honesty, and integrity in
                      our dealings with customers, partners, and employees.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div
              data-aos="fade-right"
              data-aos-anchor="commitment-anchor"
              data-aos-delay="1000"
              aria-hidden="true"
              className="mt-10 lg:mt-0"
            >
              <img
                src="https://i.ibb.co/k5kt3VW/24trending-shophotels1-super-Jumbo.jpg"
                alt=""
                className="h-[300px] object-cover w-full mx-auto rounded-lg shadow-lg md:h-[500px] md:w-[80%] dark:bg-gray-500"
              />
            </div>
          </div>
          <div>
            <div className="grid lg:gap-8 lg:grid-cols-2 lg:items-center">
              <div
                className="lg:col-start-2"
                data-aos="fade-left"
                data-aos-anchor="commitment-anchor"
                data-aos-delay="1800"
              >
                <h3 className="text-2xl font-bold tracking-tight sm:text-3xl dark:text-gray-900">
                  Services
                </h3>
                <p className="mt-3 text-lg dark:text-gray-600">
                  Our dedication to service is ingrained in every aspect of our
                  operations. We pride ourselves on providing personalized
                  attention to each client, ensuring that their individual needs
                  are met with precision and care.
                </p>
                <div className="mt-12 space-y-12">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center w-12 h-12 rounded-md dark:bg-violet-600 dark:text-gray-50">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          className="w-7 h-7"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          ></path>
                        </svg>
                      </div>
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg font-medium leading-6 dark:text-gray-900">
                        Personalized Attention
                      </h4>
                      <p className="mt-2 dark:text-gray-600">
                        We take the time to understand your unique needs and
                        preferences, tailoring our solutions to meet your
                        specific requirements.
                      </p>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center w-12 h-12 rounded-md dark:bg-violet-600 dark:text-gray-50">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          className="w-7 h-7"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          ></path>
                        </svg>
                      </div>
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg font-medium leading-6 dark:text-gray-900">
                        Timely Responses
                      </h4>
                      <p className="mt-2 dark:text-gray-600">
                        We understand the importance of prompt communication.
                        Whether you have a question, concern, or request, we
                        respond quickly and efficiently.
                      </p>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center w-12 h-12 rounded-md dark:bg-violet-600 dark:text-gray-50">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          className="w-7 h-7"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          ></path>
                        </svg>
                      </div>
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg font-medium leading-6 dark:text-gray-900">
                        Expert Guidance
                      </h4>
                      <p className="mt-2 dark:text-gray-600">
                        Our team of experienced professionals is here to guide
                        you every step of the way. From product selection to
                        project implementation, we provide expert advice and
                        support.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-10 lg:mt-0 lg:col-start-1 lg:row-start-1">
                <img
                  src="https://i.ibb.co/qkSbhWj/870587-hotel-room-092519.jpg"
                  alt=""
                  className="object-cover mx-auto md:h-[500px] md:w-[80%] rounded-lg shadow-lg dark:bg-gray-500"
                />
              </div>
            </div>
          </div>
          <div id="commitment-anchor"></div>
        </div>
      </section>
    </div>
  );
};

export default About;
