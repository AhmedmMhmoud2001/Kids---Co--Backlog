import Section from "../common/Section";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const formatWordmark = (name) => {
  // شيل الرموز والمسافات وخلي كل كلمة تبدأ Capital
  return name
    .replace(/&/g, "and")
    .replace(/[^a-zA-Z0-9\s]/g, " ") // يشيل - و ' و أي رموز
    .split(" ")
    .filter(Boolean)
    .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join("");
};

const BrandsSection = () => {
  const brands = [
    "Golden goose",
    "Gucci",
    "On cloud",
    "Ugg",
    "All saints",
    "Nike",
    "Adidas",
    "Karl lagerfeld",
    "Spray ground",
    "Smiggle",
    "Disney",
    "Gant",
    "Ralph lauren",
    "Fendi",
    "Dolce&Gabbana",
    "Crocs",
    "Puma",
    "DKNY",
    "Kenzo",
    "Marc Jacobs",
    "Stella Mccarteny",
    "Boss",
    "OFF WHITE",
    "CHLOE",
    "DSQUARED2",
    "GIVENCHY",
    "Moschino",
    "River island",
    "Ted baker",
    "Palm angels",
    "VERSACE",
    "Tommy Hilfiger",
    "DIOR",
    "BALMAIN",
    "BURBERRY",
    "Ea7 Emporio Armani",
    "MC2 Saint Barth",
    "New Balance",
    "NESSI Byrd",
    "Stella Cove",
    "Shade critters",
    "PHILIPP PLIEN",
    "PINKO",
    "vilebrequin",
    "Moncler",
    "roberto cavalli",
    "Hugo",
  ];

  return (
    <Section padding="py-4 sm:py-5 lg:py-6" className="border-b">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={4}
        autoplay={{
          delay: 2200,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        loop
        breakpoints={{
          640: { slidesPerView: 3, spaceBetween: 20 },
          768: { slidesPerView: 4, spaceBetween: 24 },
          1024: { slidesPerView: 6, spaceBetween: 24 },
          1280: { slidesPerView: 8, spaceBetween: 24 },
        }}
        className="!pb-2"
      >
        {brands.map((name) => (
          <SwiperSlide key={name}>
            <div className="flex items-center justify-center">
              <span
                className="
                  brand-wordmark
                  text-black
                  opacity-50
                  text-2xl sm:text-3xl md:text-4xl
                  leading-none
                  whitespace-nowrap
                  select-none
                "
                title={name}
              >
                {formatWordmark(name)}
              </span>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </Section>
  );
};

export default BrandsSection;
