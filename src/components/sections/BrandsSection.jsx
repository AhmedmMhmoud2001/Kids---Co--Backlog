import Section from "../common/Section";
import RiverIsland from "../../assets/Maskgroup.png";
import GUCCI from "../../assets/Frame3.png";
import TEDBAKER from "../../assets/path2.png";
import GOLDENGOOSE from "../../assets/Maskgroup.png"; // تأكد من الاسم
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

/**
 * Brands section component
 */
const BrandsSection = () => {

  const brands = [
    {id:1, src: RiverIsland, alt: "River Island" },
    {id:2,src: GUCCI, alt: "GUCCI" },
    {id:3, src: GOLDENGOOSE, alt: "GOLDEN GOOSE" },
    {id:4, src: TEDBAKER, alt: "TED BAKER" },
    {id:5, src: TEDBAKER, alt: "TED BAKER" },
    {id:6, src: TEDBAKER, alt: "TED BAKER" },
    {id:7, src: TEDBAKER, alt: "TED BAKER" },
    {id:8, src: TEDBAKER, alt: "TED BAKER" },
    
  ];

  return (

    <Section padding="py-4 sm:py-5 lg:py-6" className="border-b">
         <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            // pagination={{ 
            //   clickable: true,
            //   dynamicBullets: true,
            // }}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            loop={true}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 24,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 24,
              },
              1280: {
                slidesPerView: 5,
                spaceBetween: 24,
              },
            }}
            className="!pb-14"
          >
        {brands.map((brand) => (
          <SwiperSlide key={brand.id}>
            <img
              src={brand.src}
              alt={brand.alt}
              className="h-8 sm:h-10 md:h-12 max-w-36 object-contain"
              
            />
          </SwiperSlide>
        ))}
      
         </Swiper>
    </Section>
  );
};

export default BrandsSection;
