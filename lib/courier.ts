import { GmailEndpoint } from './gmail'

class Client {
  token?: string
  isAuthorized = (): boolean => typeof this.token !== 'undefined'
  readonly baseEndpoint = 'api.courier.com/send'
}

const client = new Client()

export const gmail = new GmailEndpoint()
export const authorize = (token: string): void => {
  client.token = token
}
