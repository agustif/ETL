import fetch from 'node-fetch'
import { parseStringPromise } from 'xml2js'
import {RequestOptions} from './requestUtils'

export async function fetchXml<T>(url: string, options: RequestOptions): Promise<T> {
  const response = await fetch(url, {
    method: options.method,
    headers: options.headers,
    body: options.body,
  })
  if (!response.ok) {
    throw new Error(`Error fetching XML data: ${response.statusText}`)
  }
  const xml = await response.text()
  const parsedXML = await parseStringPromise(xml)
  return parsedXML.root
}
