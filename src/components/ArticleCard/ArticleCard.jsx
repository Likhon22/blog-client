/* eslint-disable react/prop-types */
const ArticleCard = ({ card }) => {
  const { title, category, image } = card;
  return (
    <div className="card bg-base-100 w-96 shadow-xl ">
      <figure>
        <img src={image} className="w-full h-full" alt="Shoes" />
      </figure>
      <p className="absolute top-1/2 left-3 bg-red-600 text-white py-1 px-2 rounded-lg">
        {category}
      </p>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
      </div>
    </div>
  );
};

export default ArticleCard;
