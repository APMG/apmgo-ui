// @flow
import axios from 'axios'
import apmAccount from './apm-account'

export class BragiApiClient {
  instance: any

  static getInstance = function (): any {
    if (this.instance) {
      return this.instance
    }

    let accessToken = apmAccount.get_token()

    this.instance = axios.create({
      baseURL: 'https://bragi-api-dev.publicradio.org',
      timeout: 10000,
      headers: {'Authorization': `Bearer ${accessToken}`}
    })

    return this.instance
  }
}
