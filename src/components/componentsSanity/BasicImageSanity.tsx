import BasicImage from "@/components/basicImage";

interface IProps {
  data: any;
}
const BasicImageSanity = ({ data }: IProps) => {
  return <BasicImage data={data} />;
};

export default BasicImageSanity;
