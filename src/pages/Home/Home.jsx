import { Helmet } from "react-helmet-async";
import FeaturedArticle from "../../components/FeaturedArticle/FeaturedArticle";
import FeaturedCategories from "../../components/FeaturedCategories/FeaturedCategories";
import Banner from "../../components/Home/Banner/Banner";
import LatestArticleCards from "../../components/Home/LatestArticleCards/LatestArticleCards";
import NewsletterSignup from "../../components/NewsletterSignup/NewsletterSignup";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Zenfla - Home</title>

        {/* Primary Meta Tags */}
        <meta
          name="description"
          content="Welcome to our blog featuring the latest articles, featured content, and popular categories."
        />
        <meta
          name="keywords"
          content="blog, articles, featured, categories, zenfla"
        />
        <link rel="canonical" href="https://www.zenfla.com/" />

        {/* Open Graph / Facebook */}
        <meta property="og:title" content="Zenfla - Home" />
        <meta
          property="og:description"
          content="Welcome to our blog featuring the latest articles, featured content, and popular categories."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.zenfla.com/" />
        <meta property="og:site_name" content="Zenfla" />
        <meta property="og:image" content="https://www.zenfla.com/logo.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Zenfla - Home" />
        <meta
          name="twitter:description"
          content="Welcome to our blog featuring the latest articles, featured content, and popular categories."
        />
        <meta name="twitter:image" content="https://www.zenfla.com/logo.png" />

        {/* Additional SEO */}
        <meta name="robots" content="index, follow" />
      </Helmet>
      <Banner />

      <LatestArticleCards />
      <FeaturedArticle />
      <FeaturedCategories />
      <NewsletterSignup />
    </div>
  );
};

export default Home;
