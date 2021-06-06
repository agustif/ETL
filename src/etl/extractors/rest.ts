import fetch from 'node-fetch';
import { Brewery } from 'etl/types/brewery'


export default async function restExtractor({endpoint, format}: RestExtractorOptions): Promise<Brewery[]> {
    try {
        const response = await fetch(endpoint)
        if (format === 'JSON') {
            const breweries = await response.json()
            return breweries
        }
        if (!format) {
            console.error('You must provide a format option in restExtractor')
        }
    } catch (error) {
        if (error.name === 'AbortError') {
			console.log('request was aborted');
        }
        if (error.code === 'ENOTFOUND') {
			console.log(`Sorry, ${endpoint} is not reachable. Check your internet connection`);
        }
        else {
            console.log(error)
        }
    }
    return JSON.parse('')
}

export enum Format{
    Json = "JSON",
}

export interface RestExtractorOptions  {
    endpoint: string
    format: Format
}
