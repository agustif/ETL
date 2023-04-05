import fetch from 'node-fetch'
import {RequestOptions} from './requestUtils'

export async function fetchJson<T>(url: string, options: RequestOptions): Promise<T> {
  const response = await fetch(url, {
    method: options.method,
    headers: options.headers,
    body: options.body,
  })
  if (!response.ok) {
    throw new Error(`Error fetching JSON data: ${response.statusText}`)
  }
  return await response.json()
}
