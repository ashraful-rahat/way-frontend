import BannerCarousel from "./components/Banner";
import { FindTheProperty } from "./components/FindTheProperty";

export default function HomePage() {
  return (
    <div>
      <BannerCarousel></BannerCarousel>
      <FindTheProperty></FindTheProperty>
    </div>
  );
}
