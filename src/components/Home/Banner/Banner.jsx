import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { axiosInstance } from "../../../utils";
import Loader from "../../Loader/Loader";
import { Link } from "react-router-dom";

const images = [
  "https://img.daisyui.com/images/stock/photo-1625726411847-8cbb60cc71e6.webp",
  "https://img.daisyui.com/images/stock/photo-1609621838510-5ad474b7d25d.webp",
  "https://img.daisyui.com/images/stock/photo-1414694762283-acccc27bca85.webp",
  "https://img.daisyui.com/images/stock/photo-1665553365602-b2fb8e5d1707.webp",
];

const Banner = () => {
  const [search, setSearch] = useState("");
  console.log(search);

  const {
    data: results,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["blogs", search],
    queryFn: async () => {
      const response = await axiosInstance.get(
        `/articles/all-articles?searchTerm=${search}`
      );
      return response.data;
    },
    enabled: !!search,
    staleTime: 60000,
  });

  return (
    <div className="relative w-full h-screen">
      {/* Carousel */}
      <div className="carousel w-full h-full">
        {images.map((img, index) => {
          const prevSlide = index === 0 ? images.length - 1 : index - 1;
          const nextSlide = index === images.length - 1 ? 0 : index + 1;

          return (
            <div
              key={index}
              id={`slide${index}`}
              className="carousel-item relative w-full h-full"
            >
              <img
                src={img}
                className="w-full h-full object-cover"
                alt={`Slide ${index + 1}`}
              />

              {/* Left & Right Navigation Buttons */}
              <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                <a href={`#slide${prevSlide}`} className="btn btn-circle">
                  ❮
                </a>
                <a href={`#slide${nextSlide}`} className="btn btn-circle">
                  ❯
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {/* Search Box Overlay (Centered) */}
      <div className="absolute top-1/3 left-1/2 w-1/2 -translate-x-1/2 -translate-y-1/2">
        <input
          type="text"
          placeholder="Search here..."
          className="input input-bordered rounded-lg w-full text-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="relative mt-2">
          {/* Display Results */}
          {isLoading && <Loader />}

          {error && (
            <p className="absolute top-[55%] left-1/2 -translate-x-1/2 text-red-500 font-semibold">
              Error fetching results.
            </p>
          )}

          {results?.data?.length > 0 && (
            <div className="bg-white opacity-95 absolute top-[55%] min-h-96     w-full  shadow-lg rounded-lg max-h-[400px] overflow-y-auto mt-2">
              {results?.data?.map((result, index) => (
                <Link key={index} to={`/blog/${result._id}`}>
                  <div className="py-3 px-4  transition-all rounded-lg cursor-pointer">
                    <div className="flex items-center bg-gray-100 hover:bg-gray-200 rounded-lg p-4">
                      {/* You can add an icon or image here */}
                      <span className="font-semibold text-lg pb-1 ">
                        {result.title}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Banner;
