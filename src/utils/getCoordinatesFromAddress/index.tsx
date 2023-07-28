import axios from "axios";

interface GeocodingResponse {
  results: {
    geometry: {
      location: {
        lat: number;
        lng: number;
      };
    };
  }[];
}

const getCoordinatesFromAddress = async (
  address: string,
  api_key: string
): Promise<{ lat: number; lon: number }> => {
  const apiKey = api_key
  const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json`;

  try {
    const response = await axios.get<GeocodingResponse>(apiUrl, {
      params: {
        address: address,
        key: apiKey,
      },
    });

    const { results } = response.data;

    if (results && results.length > 0) {
      const { lat, lng } = results[0].geometry.location;
      return { lat, lon: lng };
    } else {
      throw new Error(
        "No se encontraron resultados para la dirección especificada."
      );
    }
  } catch (error) {
    console.error("Error al obtener coordenadas:", error);
    throw error;
  }
};

export default getCoordinatesFromAddress;
