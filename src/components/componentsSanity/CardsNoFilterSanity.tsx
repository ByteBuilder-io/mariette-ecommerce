import Contact from "@/components/contact";
import Instagram from "@/components/instragram";
import CardsNoFilter from "@/components/cardsNoFilter";

const CardsNoFilterSanity = ({ data }: { data: any }) => {
  console.log(data.title);
  return <CardsNoFilter title={data.title} />;
};

export default CardsNoFilterSanity;
