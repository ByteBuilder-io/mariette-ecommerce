import { useEffect, useRef, useState } from "react";
import Map, { Marker, Popup } from "react-map-gl";
import mapboxgl from "mapbox-gl";

const API_MAPBOX = process.env.NEXT_PUBLIC_MAPBOX_API_KEY || "";
mapboxgl.accessToken = API_MAPBOX;

import getCoordinatesFromAddress from "@/utils/getCoordinatesFromAddress";
import { Box } from "@chakra-ui/react";
import "mapbox-gl/dist/mapbox-gl.css";

interface ContainerProps {
  address?: string | string[] | undefined;
}

const CheckOutMaps = (props: ContainerProps) => {
  const { address } = props;
  const mapContainer = useRef(null);
  const map = useRef<any>(null);
  const marker = useRef<any>(null);
  const [lng, setLng] = useState(0);
  const [lat, setLat] = useState(0);
  const [zoom, setZoom] = useState(14);

  const loadMap = async () => {
    const data = await getCoordinatesFromAddress(
      address?.toString() || "",
      process.env.NEXT_PUBLIC_MAPBOX_API_KEY || ""
    );
    setLng(data.lng);
    setLat(data.lat);
  };

  useEffect(() => {
    if (map.current) return;
    loadMap();
  }, []);

  return (
    <>
      {lng !== 0 && (
        <Box width="100%" height="400px">
          <Map
            mapboxAccessToken={API_MAPBOX}
            initialViewState={{
              longitude: lng,
              latitude: lat,
              zoom: 15,
            }}
            mapStyle="mapbox://styles/mapbox/streets-v9"
          >
            <Marker longitude={lng} latitude={lat} anchor="top"></Marker>
            <Popup
              latitude={lat}
              longitude={lng}
              closeButton={false}
              closeOnClick={false}
              anchor="bottom"
            >
              <div>
                <p>
                  <b>Dirección de envio</b>
                </p>
                <p>{address}</p>
              </div>
            </Popup>
          </Map>
        </Box>
      )}
    </>
  );
};

export default CheckOutMaps;
