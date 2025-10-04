import BannerCarousel from "./components/Banner";
import { FindTheProperty } from "./components/FindTheProperty";
import Partners from "./components/Partners";
import WhyChooseUs from "./components/WhyChosseUs";

export default function HomePage() {
  return (
    <div>
      <BannerCarousel></BannerCarousel>
      <FindTheProperty></FindTheProperty>
      <WhyChooseUs></WhyChooseUs>
      <Partners></Partners>
    </div>
  );
}
