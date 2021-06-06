import fetch from 'node-fetch';
import { Brewery } from 'etl/types/brewery'

const randomDate = (start: Date, end: Date): string => {
    let date =  new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    return date.toISOString()
}

// randomDate(new Date(2012, 0, 1), new Date())

export default async function restExtractor({endpoint, format, randomCreatedAt = false}: RestExtractorOptions): Promise<Brewery[]> {
    try {
        const response = await fetch(endpoint)
        if (format === 'JSON') {
            const breweries = await response.json()
            // Randomizing createdAt attribute in order to make it easier to test for ordering it. ;-)
            if (randomCreatedAt) breweries.forEach((brew: { created_at: string }) => brew.created_at = randomDate(new Date(2018, 7, 24), new Date()))
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
    randomCreatedAt: boolean
    format: Format
}
