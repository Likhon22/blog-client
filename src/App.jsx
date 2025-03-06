import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import { Helmet } from "react-helmet-async";

function App() {
  return (
    <>
      <Helmet>
        {/* Global site tag - Logo & Organization data */}
        <link rel="icon" type="image/png" href="/logo.png" />
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Zenfla",
              "url": "https://www.zenfla.com",
              "logo": "https://www.zenfla.com/logo.png",
              "sameAs": [
                "https://facebook.com/zenfla",
                "https://twitter.com/zenfla"
              ]
            }
          `}
        </script>
      </Helmet>

      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
