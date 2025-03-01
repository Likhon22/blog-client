import FeaturedArticle from "../../components/FeaturedArticle/FeaturedArticle";
import FeaturedCategories from "../../components/FeaturedCategories/FeaturedCategories";
import Banner from "../../components/Home/Banner/Banner";
import LatestArticleCards from "../../components/Home/LatestArticleCards/LatestArticleCards";
import NewsletterSignup from "../../components/NewsletterSignup/NewsletterSignup";

const Home = () => {
  return (
    <div>
      <Banner />

      <LatestArticleCards />
      <FeaturedArticle />
      <FeaturedCategories />
      <NewsletterSignup />
    </div>
  );
};

export default Home;
