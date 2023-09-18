import axios from "axios";

const getCoordinatesFromAddress = async (
  address: string,
  api_key: string
): Promise<{ lat: number; lng: number }> => {
  try {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
      address
    )}.json?access_token=${api_key}`;
    
    const response = await axios.get(url);
    
    if (response.status === 200 && response.data.features.length > 0) {
      const [lng, lat] = response.data.features[0].center;
      return { lat, lng };
    } else {
      throw new Error('No se encontraron resultados para la dirección proporcionada.');
    }
  } catch (error) {
    throw new Error('Error al obtener las coordenadas: ');
  }
};

export default getCoordinatesFromAddress;
