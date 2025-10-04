import BannerCarousel from "./components/Banner";
import { FindTheProperty } from "./components/FindTheProperty";
import WhyChooseUs from "./components/WhyChosseUs";

export default function HomePage() {
  return (
    <div>
      <BannerCarousel></BannerCarousel>
      <FindTheProperty></FindTheProperty>
      <WhyChooseUs></WhyChooseUs>
    </div>
  );
}
