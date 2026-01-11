import Section from "../common/Section";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

import brandsImg1 from "../../assets/Frame2.png";
import brandsImg3 from "../../assets/Maskgroup.png";
import brandsImg4 from "../../assets/path2.png";

const BrandsSection = () => {
  const brands = [
    { id: 1, brandsImg: brandsImg1, name: "brandname" },
    { id: 3, brandsImg: brandsImg3, name: "brandname" },
    { id: 4, brandsImg: brandsImg4, name: "brandname" },
    { id: 5, brandsImg: brandsImg1, name: "brandname" },
    { id: 7, brandsImg: brandsImg3, name: "brandname" },
    { id: 8, brandsImg: brandsImg4, name: "brandname" },
  ];

  return (
    <Section padding="py-4 sm:py-5 lg:py-6" className="border-b">
      <Swiper
        modules={[Autoplay]}
        loop
        centeredSlides={false}
        
        autoplay={{
          delay: 2200,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        breakpoints={{
          0: { slidesPerView: 1, spaceBetween: 16 },      // موبايل صغير
          480: { slidesPerView: 1, spaceBetween: 18 },   // موبايل كبير
          640: { slidesPerView: 2, spaceBetween: 20 },   // sm
          768: { slidesPerView: 3, spaceBetween: 22 },   // md
          1024: { slidesPerView: 4, spaceBetween: 24 },  // lg
          1280: { slidesPerView: 4, spaceBetween: 24 },  // xl
        }}
        className="!pb-2"
      >
        {brands.map((item) => (
          <SwiperSlide
            key={item.id}
            className="!h-auto flex items-center justify-center"
          >
            {/* حاوية ثابتة عشان كل الصور تبقى قصاد بعض */}
            <div className="h-12 w-full flex items-center justify-center cursor-pointer group">
              <img
                src={item.brandsImg}
                alt={item.name}
                className="h-full w-[80%] object-contain transition-transform duration-300 ease-in-out group-hover:scale-90"
                loading="lazy"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </Section>
  );
};

export default BrandsSection;
