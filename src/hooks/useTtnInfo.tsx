import axios from 'axios';
import {API_KEY, API_URL} from '../constants/constants';

export const useTtnInfo = async (
  packageNumber: string,
  phoneNumber: string,
) => {
  const resp = await axios.post(API_URL, {
    apiKey: API_KEY,
    modelName: 'TrackingDocument',
    calledMethod: 'getStatusDocuments',
    methodProperties: {
      Documents: [
        {
          DocumentNumber: packageNumber,
          Phone: phoneNumber,
        },
      ],
    },
  });
  return resp.data.data[0];
};
