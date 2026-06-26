import Image from "next/image";

const FamousPlacesHero = () => (
  <section className="relative w-full h-[180px] sm:h-[240px] md:h-[300px] lg:h-[360px]">
    <Image
      src="/images/famous-temples-banner.png"
      alt="Famous Temples — Find Divine Places Near You"
      fill
      priority
      quality={100}
      unoptimized={true}
      className="object-cover object-center"
    />
  </section>
);

export default FamousPlacesHero;
// astrology-in-bharat-app-frontend\apps\main\public\images\famous-temples-banner.png