import Section from "../common/Section";
import RiverIsland from "../../assets/Maskgroup.png";
import GUCCI from "../../assets/Frame3.png";
import TEDBAKER from "../../assets/path2.png";
import GOLDENGOOSE from "../../assets/Maskgroup.png"; // تأكد من الاسم

/**
 * Brands section component
 */
const BrandsSection = () => {
  const brands = [
    { src: RiverIsland, alt: "River Island" },
    { src: GUCCI, alt: "GUCCI" },
    { src: GOLDENGOOSE, alt: "GOLDEN GOOSE" },
    { src: TEDBAKER, alt: "TED BAKER" },
    { src: TEDBAKER, alt: "TED BAKER" },
    
  ];

  return (
    <Section padding="py-4 sm:py-5 lg:py-6" className="border-b">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-16 sm:gap-6 md:gap-8 items-center justify-items-center">
        {brands.map((brand, idx) => (
          <div
            key={idx}
            className=" transition-opacity"
          >
            <img
              src={brand.src}
              alt={brand.alt}
              className="h-8 sm:h-10 md:h-12 max-w-36 object-contain"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </Section>
  );
};

export default BrandsSection;
