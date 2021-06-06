

export default function addUSRegion(options: RemoveAttributeOptions): any {
    const { config , data } = options
    const {attribute} = config
    if (attribute === 'NULL') {
        return data.map(brewery => {
            const removedNullAttributes = Object.entries(brewery)
                .filter(([, val]) => val !== null)
            return Object.fromEntries(removedNullAttributes);
        })
    }
    else if (!attribute) {
        console.error('transformation addUSRegion requires an attribute argument!')
    }
    else if (!data) {
        console.error('transformation addUSRegion requires an extractor to be used first')
    } else {
        return data
    }
}

export enum RemoveOptions{
    Null = "NULL",
    Empty = "EMPTY",
}
export interface RemoveAttributeConfig{
    attribute:  RemoveOptions
}

export interface RemoveAttributeOptions  {
    config: RemoveAttributeConfig
    data: Object[]
}
