import Hero from "@/components/hero";
import { IHero } from "@/typesSanity/docs/hero";

interface IHeroProps {
  data: IHero;
}
const HeroSanity = ({ data }: IHeroProps) => {
  return <Hero dataHero={data} />;
};

export default HeroSanity;
