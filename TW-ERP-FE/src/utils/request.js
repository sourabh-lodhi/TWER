import axios from 'axios';
import { getLocalData } from './localStorage';

export const request = async ({
  url,
  method = 'get',
  data = {},
  params = null,
}) => {
  const token = getLocalData('token');
  const headers = token ? { 'x-access-token': token } : '';
  const queryString = params ? params : '';
  const res = await axios({
    method,
    params: queryString,
    url: `${process.env.REACT_APP_BASE_URL}${url}`,
    data: data,
    headers,
  });
  if (res.status === 400) {
    console.log(res.data.message);
    return false;
  }
  if (res.status === 401) {
    console.log(res.data.message);
    return false;
  }
  const response = res.data;
  return response;
};
