/* eslint-disable react/prop-types */
import { FaCalendarAlt, FaUser, FaTag } from "react-icons/fa";

const SingleArticleCard = ({ blog }) => {
  const { title, category, image, post, author, createdAt } = blog;

  // Format the date if it exists
  const formattedDate = createdAt
    ? new Date(createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        timeZone: "Asia/Dhaka",
      })
    : "";

  return (
    <article className="bg-white  overflow-hidden pb-16   ">
      {/* Hero Image - positioned to go underneath the fixed navbar */}
      <div className="w-full h-[70vh] relative mt-0">
        <img
          src={
            image ||
            "https://img.daisyui.com/images/stock/photo-1625726411847-8cbb60cc71e6.webp"
          }
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
      </div>

      <div className="max-w-3xl mx-auto px-6 -mt-16 relative z-10">
        {/* Title Card */}
        <div className="bg-base-100/90  rounded-xl shadow-lg p-8 mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {title}
          </h1>

          {/* Author and Meta Info */}
          <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-2">
            {author && (
              <div className="flex items-center gap-2">
                <FaUser className="text-primary-500" />
                <span className="font-medium">{author.name}</span>
              </div>
            )}

            {formattedDate && (
              <div className="flex items-center gap-2">
                <FaCalendarAlt className="text-primary-500" />
                <span>{formattedDate}</span>
              </div>
            )}

            <div className="flex items-center gap-2">
              <FaTag className="text-primary-500" />
              <span className="uppercase text-xs font-semibold">
                {category}
              </span>
            </div>
          </div>
        </div>

        {/* Article Content */}
        <div
          className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:text-gray-900 
                    prose-p:text-gray-700 prose-img:rounded-xl prose-a:text-primary-600 mt-8"
          dangerouslySetInnerHTML={{ __html: post }}
        />
      </div>
    </article>
  );
};

export default SingleArticleCard;
