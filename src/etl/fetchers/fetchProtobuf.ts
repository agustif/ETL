import fetch from 'node-fetch'
import { RequestOptions } from './requestUtils'
import { deserializeBinary } from 'google-protobuf'

export async function fetchProtobuf<T extends jspb.Message>(
  url: string,
  options: RequestOptions,
  messageType: { new (): T }
): Promise<T> {
  const response = await fetch(url, {
    method: options.method,
    headers: options.headers,
    body: options.body,
  })
  if (!response.ok) {
    throw new Error(`Error fetching Protobuf data: ${response.statusText}`)
  }
  const buffer = await response.arrayBuffer()
  const message = messageType.deserializeBinary(new Uint8Array(buffer))
  return message as T
}