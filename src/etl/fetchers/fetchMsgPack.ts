import fetch from 'node-fetch';
import { RequestOptions } from './requestUtils';
import { decode } from '@msgpack/msgpack';

export async function fetchMsgPack<T>(url: string, options: RequestOptions): Promise<T> {
  const response = await fetch(url, {
    method: options.method,
    headers: options.headers,
    body: options.body,
  });

  if (!response.ok) {
    throw new Error(`Error fetching MsgPack data: ${response.statusText}`);
  }

  const data = await response.arrayBuffer();
  return decode(data) as T;
}