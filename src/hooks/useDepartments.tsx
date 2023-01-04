import axios from 'axios';
import {API_KEY, API_URL} from '../constants/constants';

export const useDepartments = async (cityName: string) => {
  const resp = await axios.post(API_URL, {
    apiKey: API_KEY,
    modelName: 'Address',
    calledMethod: 'getWarehouses',
    methodProperties: {
      CityName: cityName,
      TypeOfWarehouseRef: '841339c7-591a-42e2-8233-7a0a00f0ed6f',
      Limit: '20',
    },
  });
  return resp.data.data;
};
