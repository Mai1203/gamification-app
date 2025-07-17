import Carousel from "../ui/dashboard/carousel";
import Recommendations from "../ui/dashboard/recommendations";
import Card from "../ui/dashboard/card-score"

export default function Page() {
  return (
    <div className="max-h-[780px] overflow-y-auto pr-2">
      <Card />
      <Carousel />
      <Recommendations />
    </div>
  );
}