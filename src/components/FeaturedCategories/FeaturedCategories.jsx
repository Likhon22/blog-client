import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { axiosInstance } from "../../utils";
import Loader from "../Loader/Loader";

const FeaturedCategories = () => {
  const { data: categories, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await axiosInstance.get("/categories");
      return response.data;
    },
  });

  // Generate a dynamic background style for each category
  const getCategoryStyle = (index) => {
    // Create a rotating palette effect
    const variations = [
      "bg-primary/80 hover:bg-primary",
      "bg-secondary/80 hover:bg-secondary",
      "bg-accent/80 hover:bg-accent",
    ];
    return variations[index % variations.length];
  };

  return (
    <div>
      {categories?.length > 0 && (
        <section className="py-10 md:py-16 container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-base-content">
              Explore Topics
            </h2>
            <div className="w-24 h-1 bg-primary mx-auto my-4 rounded-full"></div>
            <p className="text-base-content/70 max-w-2xl mx-auto">
              Discover a wide range of categories and find content that matches
              your interests
            </p>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-12">
              <Loader />
            </div>
          ) : (
            <div className="flex flex-wrap justify-center gap-3 md:gap-4">
              {categories?.map((category, index) => (
                <Link
                  key={category._id}
                  to={`/category/${category.name}`}
                  className={`px-6 py-3 rounded-full text-white font-medium text-sm md:text-base transition-all transform hover:-translate-y-1 hover:shadow-md ${getCategoryStyle(
                    index
                  )}`}
                >
                  {category.name.charAt(0).toUpperCase() +
                    category.name.slice(1)}
                </Link>
              ))}
            </div>
          )}
        </section>
      )}
    </div>
  );
};

export default FeaturedCategories;
