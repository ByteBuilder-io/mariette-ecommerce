import {
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
} from "@chakra-ui/react";

type RangeSliderProps = {
  min: number;
  max: number;
  defaultValue: [number, number];
  onChange?: (range: [number, number]) => void;
};

const RangeSliderFilter = ({
  min,
  max,
  defaultValue,
  onChange,
}: RangeSliderProps) => {

  return (
    // eslint-disable-next-line jsx-a11y/aria-proptypes
    <RangeSlider aria-label={["min", "max"]} defaultValue={[10, 30]} mt="15px">
      <RangeSliderTrack>
        <RangeSliderFilledTrack bg="#997d6c" />
      </RangeSliderTrack>
      <RangeSliderThumb index={0} />
      <RangeSliderThumb index={1} />
    </RangeSlider>
  );
};

export default RangeSliderFilter;
