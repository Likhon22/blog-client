import { Link } from "react-router-dom";

/* eslint-disable react/prop-types */
const ArticleCard = ({ blog }) => {
  const { title, category, image, _id } = blog;
  return (
    <Link to={`/blog/${_id}`}>
      <div className="card bg-base-100 w-96 shadow-xl cursor-pointer transition-all duration-300 transform hover:scale-105 ">
        <figure>
          <img
            src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
            className="w-full h-full"
            alt="Shoes"
          />
        </figure>
        <p className="absolute capitalize top-1/2 left-3 bg-red-600 text-white py-1 px-2 rounded-lg">
          {category}
        </p>
        <div className="card-body">
          <h2 className="card-title">{title}</h2>
        </div>
      </div>
    </Link>
  );
};

export default ArticleCard;
