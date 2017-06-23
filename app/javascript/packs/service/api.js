import axios, { AxiosInstance } from 'axios';

export class BragiApiClient {

  instance: AxiosInstance;

  static getInstance = function (access_token: string) : AxiosInstance {
    if (!!this.instance) {
      return this.instance
    }

    return this.instance = axios.create({
      baseURL: 'https://bragi-api-dev.publicradio.org',
      timeout: 10000,
      headers: {'Authorization': `Bearer ${access_token}`}
    })
  }
}
