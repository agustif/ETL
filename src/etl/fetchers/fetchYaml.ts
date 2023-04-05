import { RequestOptions } from '../requestUtils'
import yaml from 'js-yaml'

export async function fetchYaml<T>(
  url: string,
  options: RequestOptions,
  fetchImpl: typeof fetch,
  onProgress?: (progress: number) => void
): Promise<T[]> {
  const { headers, retries } = options

  const fetchData = async (attempt: number): Promise<T[]> => {
    try {
      const response = await fetchImpl(url, { headers })

      if (!response.ok) {
        throw new Error(`Error fetching YAML data: ${response.statusText}`)
      }

      const responseText = await response.text()
      return yaml.load(responseText) as T[]
    } catch (error) {
      if (attempt < retries) {
        return fetchData(attempt + 1)
      }
      console.error('Error in fetchYaml:', error)
      return Promise.reject(error)
    }
  }

  return fetchData(0)
}