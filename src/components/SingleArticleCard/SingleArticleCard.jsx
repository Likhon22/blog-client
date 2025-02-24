/* eslint-disable react/prop-types */

const SingleArticleCard = ({ blog }) => {
  const { title, category, image, post } = blog;

  console.log(blog);

  return (
    <div className=" bg-white  rounded-2xl overflow-hidden pb-24 ">
      <img
        src="https://img.daisyui.com/images/stock/photo-1625726411847-8cbb60cc71e6.webp"
        alt={title}
        className="w-full h-screen object-cover rounded-xl"
      />

      <div className="max-w-3xl mx-auto">
        {/* Category */}
        <p className="text-sm text-gray-500 mt-3 uppercase font-semibold">
          {category}
        </p>

        {/* Title */}
        <h1 className="text-2xl font-bold mt-2 text-gray-900">{title}</h1>

        {/* Quill.js Content */}
        <div
          className="mt-4 text-gray-700 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: post }}
        />
      </div>
    </div>
  );
};

export default SingleArticleCard;
