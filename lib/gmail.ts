import type { EmailProps } from '@typings/gmail'
import { client } from './courier'

export class GmailEndpoint {
  email = (props: EmailProps) => {
    const raw = JSON.stringify({
      message: {
        to: { email: props.to },
        content: { title: props.title, body: props.body },
      },
    })

    const headers = new Headers()
    headers.append('Authorization', `Bearer ${client.token}`)
    headers.append('Content-Type', 'application/json')

    const requestOptions: RequestInit = {
      method: 'POST',
      headers: headers,
      body: raw,
      redirect: 'follow',
    }

    return fetch('https://api.courier.com/send', requestOptions)
      .then((response) => response.json())
      .then((result) => result)
      .catch((error) => error)
  }
}
