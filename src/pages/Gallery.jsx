import { Helmet } from "react-helmet-async";

const Gallery = () => {
    return (
      <div className="my-5  md:my-10 container mx-auto max-w-screen-xl">
        <Helmet>
          <title>Prebon Hotels: Gallery</title>
        </Helmet>
        <div className="my-10">
          <hr className="my-3 border-gray-200  dark:border-gray-700" />
          <h2 className="text-center text-xl md:text-3xl font-semibold">
            Some Beatuiful Pictures Of Our Rooms
          </h2>
          <p className="md:max-w-xl px-4 md:px-0 mx-auto opacity-90 text-center pt-2">
            Discover the essence of modern sophistication as depicted in our
            captivating room photos, highlighting exquisite details and
            ambiance. Indulge your senses with a glimpse of our inviting spaces,
            where style meets serenity in every frame.
          </p>
          <hr className="my-3 border-gray-200  dark:border-gray-700" />
        </div>
        <section className="py-6 dark:bg-gray-100 dark:text-gray-900">
          <div className="container grid grid-cols-2 gap-4 p-4 mx-auto md:grid-cols-4">
            <img
              src="https://i.ibb.co/tJtfVVn/g-10.jpg"
              alt=""
              className="object-cover hover:scale-95 duration-500 w-full h-full col-span-2 row-span-2 rounded shadow-sm min-h-96 md:col-start-3 md:row-start-1 dark:bg-gray-500 aspect-square"
            />
            <img
              alt=""
              className="object-cover hover:scale-95 duration-500 w-full h-full rounded shadow-sm min-h-48 dark:bg-gray-500 aspect-square"
              src="https://i.ibb.co/PYNv4fN/g9.jpg"
            />
            <img
              alt=""
              className="object-cover hover:scale-95 duration-500 w-full h-full rounded shadow-sm min-h-48 dark:bg-gray-500 aspect-square"
              src="https://i.ibb.co/JmMvpKM/8.jpg"
            />
            <img
              alt=""
              className="object-cover hover:scale-95 duration-500 w-full h-full rounded shadow-sm min-h-48 dark:bg-gray-500 aspect-square"
              src="https://i.ibb.co/99cF0Z4/g7.jpg"
            />
            <img
              alt=""
              className="object-cover hover:scale-95 duration-500 w-full h-full rounded shadow-sm min-h-48 dark:bg-gray-500 aspect-square"
              src="https://i.ibb.co/RP9xHPZ/g6.jpg"
            />
            <img
              alt=""
              className="object-cover hover:scale-95 duration-500 w-full h-full rounded shadow-sm min-h-48 dark:bg-gray-500 aspect-square"
              src="https://i.ibb.co/x7c9gQN/g5.jpg"
            />
            <img
              alt=""
              className="object-cover hover:scale-95 duration-500 w-full h-full rounded shadow-sm min-h-48 dark:bg-gray-500 aspect-square"
              src="https://i.ibb.co/tPWfSLt/g4.webp"
            />
            <img
              alt=""
              className="object-cover hover:scale-95 duration-500 w-full h-full rounded shadow-sm min-h-48 dark:bg-gray-500 aspect-square"
              src="https://i.ibb.co/7JTZ20N/g3.jpg"
            />
            <img
              alt=""
              className="object-cover hover:scale-95 duration-500 w-full h-full rounded shadow-sm min-h-48 dark:bg-gray-500 aspect-square"
              src="https://i.ibb.co/d4b6qBd/g2.jpg"
            />
            <img
              src="https://i.ibb.co/drs8HP5/g1.jpg"
              alt=""
              className="object-cover hover:scale-95 duration-500 w-full h-full col-span-2 row-span-2 rounded shadow-sm min-h-96 md:col-start-1 md:row-start-3 dark:bg-gray-500 aspect-square"
            />
          </div>
        </section>
      </div>
    );
};

export default Gallery;