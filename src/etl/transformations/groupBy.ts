import { Brewery } from 'etl/types/brewery'

export default function groupBy(options: GroupByOptions): any {
    const { config } = options
    const { group, order, orderBy } = config
    let { data } = options
    if (orderBy && group) {
        // ordering before grouping makes things easier
        data = orderByValue({ data, config })
        data = groupByKey({ data, config })

        return data
    }
    else if (orderBy && order && !group) {
        data = orderByValue({ data, config })
        return data
    }
    else if (!order || !orderBy && group) {
        data = groupByKey({ data, config })
        return data
    }
    else if (!group) {
        console.error('transformation groupBy requires an group argument!')
    }
    else if (!data) {
        console.error('transformation groupBy requires an extractor to be used first')
    }
    return data
}

const groupByKey = ({ data, config }: GroupByOptions) =>
    data.reduce((result: any, accumulator) => {
        result[accumulator[config.group]] =
            [...result[accumulator[config.group]]
                || [], accumulator];
        return result;
    }, {})

const orderByValue = ({ data, config }: GroupByOptions): Brewery[] => {
    const { order, orderBy } = config
    if (order === OrderOptions.Ascendent)
        data.sort((a, b) => a[orderBy] < b[orderBy] && 1 || -1)
    else if (order === OrderOptions.Descendent)
        data.sort((a, b) => a[orderBy] > b[orderBy] && 1 || -1)
    return data
}

export enum GroupOptions {
    State = "state",
    /* we could allow to group by any key that
    makes sense/is shaed between objects really,
    adding it here. */
}
export enum OrderOptions {
    Ascendent = "asc",
    Descendent = "desc",
}

export enum OrderByOptions {
    Id = "id",
    CreatedAt = "createdAt",
    UpdatedAt = "updatedAt",
    PostalCode = "postalCode",
}

export interface GroupByConfig {
    group: GroupOptions
    orderBy: OrderByOptions
    order: OrderOptions
}

export interface GroupByOptions {
    config: GroupByConfig
    data: Brewery[]
}
