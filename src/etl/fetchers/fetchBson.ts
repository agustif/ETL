import fetch from 'node-fetch'
import { RequestOptions } from './requestUtils'
import { deserialize } from 'bson'

export async function fetchBson<T>(url: string, options: RequestOptions): Promise<T> {
  const response = await fetch(url, {
    method: options.method,
    headers: options.headers,
    body: options.body,
  })
  if (!response.ok) {
    throw new Error(`Error fetching BSON data: ${response.statusText}`)
  }
  const buffer = await response.arrayBuffer()
  const data = deserialize(new Uint8Array(buffer))
  return data as T
}