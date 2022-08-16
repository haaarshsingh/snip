import langs from '@lib/languages'
import { expires } from './expires'

export type Snip = {
  slug: string
  language: keyof typeof langs
  code: string
  expiresIn: expires
  password?: string
}
