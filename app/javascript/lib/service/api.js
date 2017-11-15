// @flow
import axios from 'axios'
import authLayer from './auth-layer'
import apmgoConfig from '../config'

export class BragiApiClient {
  instance: any

  static getInstance = function (): any {
    if (this.instance) {
      return this.instance
    }

    let accessToken = authLayer.getToken()

    this.instance = axios.create({
      baseURL: apmgoConfig.apiEndpoint,
      timeout: 10000,
      headers: {'Authorization': `Bearer ${accessToken}`}
    })

    return this.instance
  }
}
