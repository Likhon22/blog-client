import { Link } from "react-router-dom";

/* eslint-disable react/prop-types */
const ArticleCard = ({ blog }) => {
  const { title, category, image, _id } = blog;

  return (
    <Link to={`/blog/${_id}`}>
      <div className="card   bg-base-100 w-96    relative   cursor-pointer transition-all duration-300 transform hover:scale-105">
        {/* Image Container */}
        <figure className="relative w-full h-[80%] overflow-hidden">
          <img
            src={
              image ||
              "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
            }
            className="w-full h-full object-cover"
            alt={title}
          />
          {/* Category Badge */}
          <p className="absolute top-2 left-2 bg-red-600 text-white py-1 px-2 rounded-lg text-sm capitalize">
            {category}
          </p>
        </figure>

        {/* Card Content */}
        <div className="card-body  flex flex-col justify-between">
          <h2 className="card-title capitalize">{title}</h2>
        </div>
      </div>
    </Link>
  );
};

export default ArticleCard;
