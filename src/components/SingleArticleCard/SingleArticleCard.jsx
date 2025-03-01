/* eslint-disable react/prop-types */
import { useState } from "react";
import {
  FaCalendarAlt,
  FaUser,
  FaTag,
  FaAngleLeft,
  FaAngleRight,
  FaChevronDown,
} from "react-icons/fa";

const SingleArticleCard = ({ blog }) => {
  const [showLightbox, setShowLightbox] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [bannerLoaded, setBannerLoaded] = useState(false);

  if (!blog) {
    return (
      <div className="p-8 text-center min-h-screen flex justify-center items-center">
        <p className="text-gray-500">Article content unavailable</p>
      </div>
    );
  }

  const {
    title,
    category,
    bannerImg,
    post,
    author,
    createdAt,
    additionalImages = [],
  } = blog;

  // Format the date if it exists
  const formattedDate = createdAt
    ? new Date(createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        timeZone: "Asia/Dhaka",
      })
    : "";

  const openLightbox = (index) => {
    setCurrentImageIndex(index);
    setShowLightbox(true);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setShowLightbox(false);
    document.body.style.overflow = "auto";
  };

  const navigateImage = (direction) => {
    const newIndex = currentImageIndex + direction;
    if (newIndex >= 0 && newIndex < additionalImages.length) {
      setCurrentImageIndex(newIndex);
    }
  };

  const scrollToContent = () => {
    document.getElementById("article-content").scrollIntoView({
      behavior: "smooth",
    });
  };

  // Extract the content to insert images at appropriate positions
  const renderContent = () => {
    if (!additionalImages || additionalImages.length === 0) {
      return <div dangerouslySetInnerHTML={{ __html: post }} />;
    }

    // Simple algorithm to intersperse images within the content
    const contentChunks = post.split("</p>");
    const result = [];

    contentChunks.forEach((chunk, index) => {
      // Add the content chunk
      if (chunk.trim()) {
        result.push(
          <div
            key={`content-${index}`}
            dangerouslySetInnerHTML={{ __html: chunk + "</p>" }}
          />
        );
      }

      // Add an image after some content chunks (not after every one)
      const imageIndex = Math.floor(index / 2);
      if (imageIndex < additionalImages.length && index % 2 === 1) {
        const image = additionalImages[imageIndex];
        result.push(
          <figure
            key={`image-${imageIndex}`}
            className="my-8 cursor-pointer hover:opacity-95 transition-opacity"
            onClick={() => openLightbox(imageIndex)}
          >
            <img
              src={image.url}
              alt={image.caption}
              className="rounded-lg shadow-lg w-full h-auto object-cover"
              onError={(e) => {
                console.error("Additional image failed to load:", image.url);
                e.target.src =
                  "https://placehold.co/1200x800/1a365d/FFFFFF?text=Image+Unavailable";
              }}
            />
            <figcaption className="text-center text-sm text-gray-500 mt-2">
              {image.caption}
            </figcaption>
          </figure>
        );
      }
    });

    return result;
  };

  return (
    <article className="bg-white overflow-hidden w-full">
      {/* Full-screen Hero Banner with fixed positioning */}
      <div className="relative h-screen w-full overflow-hidden">
        {/* Loading state */}
        {!bannerLoaded && (
          <div className="absolute inset-0 bg-gray-200 flex items-center justify-center z-10 w-full">
            <div className="animate-pulse flex flex-col items-center">
              <div className="h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-gray-600">Loading article...</p>
            </div>
          </div>
        )}

        {/* Banner image */}
        <div className="absolute inset-0 ">
          <img
            src={
              bannerImg ||
              "https://placehold.co/1200x800/1a365d/FFFFFF?text=Zenfla+Article"
            }
            alt={title}
            className="w-full h-full object-cover object-center"
            onLoad={() => setBannerLoaded(true)}
            onError={(e) => {
              console.error("Banner image failed to load:", bannerImg);
              e.target.src =
                "https://placehold.co/1200x800/1a365d/FFFFFF?text=Zenfla+Article";
              setBannerLoaded(true);
            }}
          />
        </div>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20"></div>

        {/* Article title and meta - centered for dramatic effect */}
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4 w-full ">
          <div className="max-w-4xl">
            {category && (
              <span className="inline-block px-4 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium uppercase tracking-wider mb-6">
                {category}
              </span>
            )}

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight drop-shadow-md">
              {title}
            </h1>

            {/* Meta info */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-white/90 mb-8">
              {author && (
                <div className="flex items-center gap-2">
                  <FaUser />
                  <span className="font-medium capitalize">{author.name}</span>
                </div>
              )}

              {formattedDate && (
                <div className="flex items-center gap-2">
                  <FaCalendarAlt />
                  <span>{formattedDate}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Scroll down indicator */}
        <button
          onClick={scrollToContent}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce"
          aria-label="Scroll to article content"
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-sm font-medium">Read Article</span>
            <FaChevronDown size={20} />
          </div>
        </button>
      </div>

      {/* Article content with more spacious layout */}
      <div id="article-content" className="max-w-3xl mx-auto px-6 py-16">
        {/* Article Content with interspersed images */}
        <div
          className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:text-gray-900 
                    prose-p:text-gray-700 prose-img:rounded-xl prose-a:text-blue-600 prose-a:no-underline
                    hover:prose-a:underline prose-a:font-medium"
        >
          {renderContent()}
        </div>

        {/* Category tag */}
        <div className="mt-12">
          <div className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
            <FaTag className="mr-1 text-xs" />
            {category}
          </div>
        </div>

        {/* Author info card */}
        {author && (
          <div className="mt-12 border-t border-gray-100 pt-8">
            <div className="flex items-center gap-4 bg-gray-50 p-6 rounded-lg">
              {author.userImage ? (
                <img
                  src={author.userImage}
                  alt={author.name}
                  className="w-16 h-16 rounded-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      author.name
                    )}&background=random`;
                  }}
                />
              ) : (
                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-800 text-xl font-bold">
                  {author.name.charAt(0).toUpperCase()}
                </div>
              )}
              <div>
                <h3 className="font-bold text-gray-900">
                  Written by <span className="capitalize">{author.name}</span>
                </h3>
                <p className="text-gray-600 text-sm mt-1">
                  {author.bio ||
                    (
                      <span className="capitalize">${author.name}</span>
                    )` is a contributor at Zenfla.`}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Additional Images Gallery */}
        {additionalImages.length > 0 && (
          <div className="mt-12 border-t border-gray-100 pt-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6">
              Image Gallery
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {additionalImages.map((image, index) => (
                <div
                  key={index}
                  className="cursor-pointer aspect-square overflow-hidden rounded-md shadow-md hover:shadow-lg transition-all hover:scale-[1.02]"
                  onClick={() => openLightbox(index)}
                >
                  <img
                    src={image.url}
                    alt={image.caption}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src =
                        "https://placehold.co/600x600/1a365d/FFFFFF?text=Image+Unavailable";
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Lightbox for images */}
      {showLightbox && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center"
          onClick={closeLightbox}
        >
          <div className="max-w-5xl max-h-[90vh] mx-auto px-4 relative">
            <button
              className="absolute top-4 right-4 text-white text-2xl z-10 hover:text-gray-300"
              onClick={(e) => {
                e.stopPropagation();
                closeLightbox();
              }}
              aria-label="Close lightbox"
            >
              ✕
            </button>

            <img
              src={additionalImages[currentImageIndex].url}
              alt={additionalImages[currentImageIndex].caption}
              className="max-w-full max-h-[80vh] object-contain mx-auto"
              onClick={(e) => e.stopPropagation()}
              onError={(e) => {
                e.target.src =
                  "https://placehold.co/1200x800/1a365d/FFFFFF?text=Image+Unavailable";
              }}
            />

            <div className="absolute bottom-4 left-0 right-0 text-center text-white">
              <p className="mb-4 max-w-2xl mx-auto">
                {additionalImages[currentImageIndex].caption}
              </p>
              <div className="flex justify-center items-center gap-4">
                <button
                  className="p-2 bg-white/20 rounded-full hover:bg-white/30 disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateImage(-1);
                  }}
                  disabled={currentImageIndex === 0}
                  aria-label="Previous image"
                >
                  <FaAngleLeft className="text-xl" />
                </button>
                <span className="text-sm">
                  {currentImageIndex + 1} / {additionalImages.length}
                </span>
                <button
                  className="p-2 bg-white/20 rounded-full hover:bg-white/30 disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateImage(1);
                  }}
                  disabled={currentImageIndex === additionalImages.length - 1}
                  aria-label="Next image"
                >
                  <FaAngleRight className="text-xl" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </article>
  );
};

export default SingleArticleCard;
