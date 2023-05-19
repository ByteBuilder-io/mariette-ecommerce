import BasicImageLeft from "@/components/basicImage/left";
import BasicImageRight from "@/components/basicImage/right";

interface IProps {
  data: any;
}
const BasicImage = ({ data }: IProps) => {
  if (data.side.opcion === "left") {
    return <BasicImageLeft data={data} />;
  } else {
    return <BasicImageRight data={data} />;
  }
};

export default BasicImage;
