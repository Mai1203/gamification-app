import Carousel from "../ui/dashboard/carousel";
import Recommendations from "../ui/dashboard/recommendations";
import Card from "../ui/dashboard/card-score"

export default function Page() {
  return (
    <>
      <Card />
      <Carousel />
      <Recommendations />
    </>
  );
}