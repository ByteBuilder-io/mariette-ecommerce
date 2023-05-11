import { Fragment } from "react";
import ImageText from "./Image";

const BasicImage = () => {
  return (
    <Fragment>
      <ImageText
        text="Este texto está centrado vertical y horizontalmente"
        imageUrl="https://m.media-amazon.com/images/S/aplus-media-library-service-media/caf91f62-3add-4ce0-b4dd-b625cc89b806.__CR0,43,1800,1113_PT0_SX970_V1___.jpg"
        position={1}
      />
      <ImageText
        text="Este texto está centrado vertical y horizontalmente"
        imageUrl="https://m.media-amazon.com/images/S/aplus-media-library-service-media/caf91f62-3add-4ce0-b4dd-b625cc89b806.__CR0,43,1800,1113_PT0_SX970_V1___.jpg"
        position={2}
      />
    </Fragment>
  );
};

export default BasicImage;
