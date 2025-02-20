import ArticleCard from "../../ArticleCard/ArticleCard";

const cards = [
  {
    id: 1,
    title: "Gordon Parks, Beachwear, Cuba, 1956",
    category: "Arts & Entertainment",
    image:
      "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
  },
  {
    id: 2,
    title: "Ella Fitzgerald: The First Lady of Song",
    category: "Arts & Entertainment",
    image:
      "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
  },
  {
    id: 3,
    title: "Jimmy Carter: A Noble Life",
    category: "History",
    image:
      "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
  },
];

console.log(cards);

const LatestArticleCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-4/5 mx-auto py-12">
      {cards.map((card) => (
        <ArticleCard key={card.id} card={card} />
      ))}
    </div>
  );
};

export default LatestArticleCards;
