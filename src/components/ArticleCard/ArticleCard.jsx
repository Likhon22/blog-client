import { Link } from "react-router-dom";
import { FaTag, FaUser } from "react-icons/fa";

/* eslint-disable react/prop-types */
const ArticleCard = ({ blog }) => {
  const { title, category, bannerImg, _id, author } = blog;

  return (
    <Link to={`/blog/${_id}`} className="group">
      <div className="flex flex-col h-full bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
        {/* Image Container with consistent aspect ratio */}
        <div className="relative pt-[56.25%] w-full overflow-hidden">
          <img
            src={bannerImg}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            alt={title}
          />
          <div className="absolute  top-0 left-0 w-full h-full bg-gradient-to-b from-black/10 to-transparent opacity-60"></div>

          {/* Category Badge */}
          <span className="absolute top-4 left-4 bg-red-500 text-white py-1 px-3 rounded-full text-xs font-semibold uppercase tracking-wider shadow-sm">
            {category}
          </span>
        </div>

        {/* Card Content */}
        <div className="flex flex-col flex-grow p-5">
          {/* Title with truncation for consistency */}
          <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-primary-600 transition-colors">
            {title}
          </h2>

          {/* Meta information */}
          <div className="mt-auto pt-4 flex items-center justify-between text-sm text-gray-600 border-t border-gray-100">
            {/* Author with image or icon fallback */}
            {author && (
              <div className="flex items-center gap-2">
                {author.userimg ? (
                  <img
                    src={author.userimg}
                    alt={author.name}
                    className="w-6 h-6 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center">
                    <FaUser className="text-gray-500 text-xs" />
                  </div>
                )}
                <span className="font-medium capitalize">{author.name}</span>
              </div>
            )}

            {/* Category */}
            <div className="flex items-center  gap-1.5">
              <FaTag className="text-primary-500" />
              <span className="capitalize">{category}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ArticleCard;
