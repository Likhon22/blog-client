const images = [
  "https://img.daisyui.com/images/stock/photo-1625726411847-8cbb60cc71e6.webp",
  "https://img.daisyui.com/images/stock/photo-1609621838510-5ad474b7d25d.webp",
  "https://img.daisyui.com/images/stock/photo-1414694762283-acccc27bca85.webp",
  "https://img.daisyui.com/images/stock/photo-1665553365602-b2fb8e5d1707.webp",
];

const Banner = () => {
  return (
    <div className="carousel w-full h-screen">
      {images.map((img, index) => {
        const prevSlide = index === 0 ? images.length - 1 : index - 1;
        const nextSlide = index === images.length - 1 ? 0 : index + 1;

        return (
          <div
            key={index}
            id={`slide${index}`}
            className="carousel-item relative w-full"
          >
            <img src={img} className="w-full" alt={`Slide ${index + 1}`} />
            <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
              <a href={`#slide${prevSlide}`} className="btn btn-circle">
                ❮
              </a>
              <a href={`#slide${nextSlide}`} className="btn btn-circle">
                ❯
              </a>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Banner;
