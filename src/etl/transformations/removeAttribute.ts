
export default function removeAttribute(options: RemoveAttributeOptions): any {
    const { attribute , data } = options
    console.log('attribute;',attribute)
    if (attribute === 'NULL') {
        return data.map(brewery => {
            const removedNullAttributes = Object.entries(brewery).filter(([key, val]) => val !== null)
            const removeNulled = Object.fromEntries(removedNullAttributes);
            return removeNulled
        })
    }
    else if (!attribute) {
        console.error('transformation removeAttribute requires an attribute argument!')
    }
    else if (!data) {
        console.error('transformation removeAttribute requires an extractor to be used first')
    } else {
        return data
    }
}
export enum RemoveOptions{
    Null = "NULL",
    Empty = "EMPTY",
}
import { Brewery } from 'etl/types/brewery'
export interface RemoveAttributeOptions  {
    attribute: RemoveOptions
    data: Object[]
}
