import axios, { AxiosInstance } from 'axios';
import apm_account from './apm-account'
export class BragiApiClient {

  instance: AxiosInstance;

  static getInstance = function () : AxiosInstance {
    if (this.instance) {
      return this.instance
    }

    let access_token = apm_account.get_token()

    return this.instance = axios.create({
      baseURL: 'https://bragi-api-dev.publicradio.org',
      timeout: 60000,
      headers: {'Authorization': `Bearer ${access_token}`}
    })
  }
}
