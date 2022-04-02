import axios, { AxiosRequestConfig, Method } from 'axios';


const buildRequest = ({data, headers, method, url}: AxiosRequestConfig): AxiosRequestConfig => {
  const request: AxiosRequestConfig = {
    method,
    url,
    data,
    headers,
  };

  return request
}

export const bankCodeApi = async (barCode: number) => {
  let url = "https://brasilapi.com.br/api/banks/v1/";
  let method: Method = "get";
  let headers = {
    "Content-Type": "application/json",
  }
  let bankCode = barCode.toString().substring(0, 3);

  try {
    await axios(buildRequest({
      data: {},
      headers,
      method,
      url: `${url}${bankCode}`
    }));

    return true;
  } catch (error: any) {
    return false;
  }


}
