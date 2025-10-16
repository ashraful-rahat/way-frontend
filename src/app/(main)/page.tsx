import BannerCarousel from "./components/Banner";
import FeaturedProjects from "./components/FeaturedProjects";
import { FindTheProperty } from "./components/FindTheProperty";
import OurServices from "./components/OurServices";
import Partners from "./components/Partners";
import HomePageReviews from "./components/Review";
import WhyChooseUs from "./components/WhyChosseUs";

export default function HomePage() {
  return (
    <div>
      <BannerCarousel></BannerCarousel>
      <FindTheProperty></FindTheProperty>
      <FeaturedProjects></FeaturedProjects>
      <OurServices></OurServices>
      <WhyChooseUs></WhyChooseUs>
      <HomePageReviews></HomePageReviews>
      <Partners></Partners>
    </div>
  );
}
