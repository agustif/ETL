import { RequestOptions } from './requestUtils'
import { parse } from 'papaparse'

export async function fetchCsv<T>(
  url: string,
  options: RequestOptions,
  fetchImpl: typeof fetch,
  onProgress?: (progress: number) => void
): Promise<T[]> {
  const { headers, retries } = options

  const fetchData = async (attempt: number): Promise<T[]> => {
    try {
      console.log('fetchCsv - Attempt:', attempt) // Add console log
      const response = await fetchImpl(url, { headers })

      if (!response.ok) {
        throw new Error(`Error fetching CSV data: ${response.statusText}`)
      }

      const responseText = await response.text()
      console.log('fetchCsv - Response text:', responseText) // Add console log
      const parsedData = parse<T>(responseText, { header: true })
      if (parsedData.errors.length > 0) {
        throw new Error(`Error parsing CSV data: ${JSON.stringify(parsedData.errors)}`)
      }

      return parsedData.data
    } catch (error) {
      console.error('fetchCsv - Error:', error) // Add console log
      if (attempt < retries) {
        return fetchData(attempt + 1)
      }
      console.error('Error in fetchCsv:', error)
      return Promise.reject(error)
    }
  }

  return fetchData(0)
}