import fetch from 'node-fetch'
import { fetchJson } from '../../fetchers/fetchJson'
import { fetchXml } from '../../fetchers/fetchXml'
import { fetchCsv } from '../../fetchers/fetchCsv'
import { fetchYaml } from '../../fetchers/fetchYaml'
import { fetchBson } from '../../fetchers/fetchBson'
import { RequestOptions } from '../../requestUtils'
import { fetchProtobuf } from '../../fetchers/fetchProtobuf'
import { fetchMsgPack } from '../../fetchers/fetchMsgPack'

import * as jspb from 'google-protobuf'
export default async function restExtractor<T>({
  endpoint,
  format,
  xmlRootElement,
  mapXmlData,
  fetchImpl = fetch,
  retries = 3,
  onProgress,
  ...options
}: RestExtractorOptions<T>): Promise<T[]> {
  const fetchOptions: RequestOptions = {
    method: options.method || 'GET',
    headers: options.headers,
    body: options.body,
  }

  const fetchData = async (remainingRetries: number): Promise<T[]> => {
    try {
      switch (format) {
        case Format.Json:
          return await fetchJson<T[]>(endpoint, fetchOptions, fetchImpl, onProgress)
        case Format.Xml:
          const xmlData = await fetchXml(endpoint, fetchOptions, fetchImpl, onProgress)
          const data = xmlRootElement ? xmlData[xmlRootElement] : xmlData
          return mapXmlData ? data.map(mapXmlData) : data
        case Format.Csv:
          return await fetchCsv<T[]>(endpoint, fetchOptions, fetchImpl, onProgress)
        case Format.Yaml:
          return await fetchYaml<T[]>(endpoint, fetchOptions, fetchImpl, onProgress)
        case Format.Plain:
          const plainText = await fetch(endpoint, fetchOptions).then((res) => res.text())
          return [plainText] as T[]
        case Format.Bson:
          return await fetchBson<T>(endpoint, fetchOptions)
        case Format.Protobuf:
          if (!options.messageType) {
            throw new Error('You must provide a messageType option for Protobuf in restExtractor')
          }
            return await fetchProtobuf<T[]>(endpoint, fetchOptions, options.messageType, fetchImpl, onProgress)
        case Format.MsgPack:
          return await fetchMsgPack<T[]>(endpoint, fetchOptions)
        default:
          throw new Error('You must provide a format option in restExtractor')
      }
    } catch (error) {
      if (remainingRetries > 0) {
        return fetchData(remainingRetries - 1)
      }
      console.error('Error in restExtractor:', error)
      return Promise.reject(error)
    }
  }

  return fetchData(retries)
}

export enum Format {
  Json = 'JSON',
  Xml = 'XML',
  Csv = 'CSV',
  Yaml = 'YAML',
  Bson = 'BSON',
  Plain = 'PLAIN',
  Protobuf = 'PROTOBUF',
  MsgPack = 'MSGPACK',

}

export interface RestExtractorOptions<T> extends RequestOptions {
  endpoint: string
  format: Format
  xmlRootElement?: string
  mapXmlData?: (data: any) => T
  fetchImpl?: typeof fetch
  retries?: number
  onProgress?: (progress: number) => void
  messageType?: { new (): jspb.Message }
}
