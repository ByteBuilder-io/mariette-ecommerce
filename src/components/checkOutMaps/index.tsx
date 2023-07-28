import {
  GoogleMap,
  InfoWindow,
  LoadScript,
  MarkerF,
} from "@react-google-maps/api";
import { useCallback, useEffect, useState } from "react";

import getCoordinatesFromAddress from "@/utils/getCoordinatesFromAddress";

interface ContainerProps {
  address?: string | string[] | undefined;
}

const API_KEY = "AIzaSyDoM4MIFPmnqDDF_5beFzcX-A3uMF9_Nnk";

const CheckOutMaps = (props: ContainerProps) => {
  const { address } = props;
  const [coordenates, setCoordenates] = useState<{ lat: number; lng: number }>({
    lat: 0,
    lng: 0,
  });

  const mapStyles = {
    height: "400px",
    width: "100%",
  };

  const loadData = useCallback(async () => {
    const data = await getCoordinatesFromAddress(
      address?.toString() || "",
      API_KEY
    );
    console.log(data, "data");
    setCoordenates({
      lat: data.lat,
      lng: data.lon,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {address && coordenates.lat !== 0 && coordenates.lng !== 0 && (
        <LoadScript googleMapsApiKey={API_KEY}>
          <GoogleMap
            mapContainerStyle={mapStyles}
            zoom={12}
            center={coordenates}
          >
            <MarkerF position={coordenates}>
              {address && coordenates.lat !== 0 && coordenates.lng !== 0 && (
                <InfoWindow position={coordenates}>
                  <div style={{ backgroundColor: "white" }}>
                    <h3 style={{ textAlign: "center", paddingBottom: "5px" }}>
                      <b>Direccion de entrega</b>
                    </h3>
                    <p style={{ textAlign: "center" }}>{address}</p>
                  </div>
                </InfoWindow>
              )}
            </MarkerF>
          </GoogleMap>
        </LoadScript>
      )}
    </>
  );
};

export default CheckOutMaps;
