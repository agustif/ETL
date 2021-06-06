import { Brewery } from 'etl/types/brewery'


const groupByKey = ({data, config}: GroupByOptions) => {
    const {group} = config
    return data.reduce((
        result: any,
        item
    ) => ({
            ...result,
            [item[group]]: [
            ...(result[item[group]] || []),
            item,
            ],
        }),
    {},
);}
const orderByValue = ({ data, config }: GroupByOptions) =>
    data.sort((a, b) => a.createdAt < b.createdAt && 1 || -1)


export default function groupBy(options: GroupByOptions): any {
    const { config } = options
    const {group, order, orderBy } = config
    console.log('group;', group, order, orderBy)
    let { data } = options
    if (orderBy && group) {

        // ordering before grouping makes things easier
        data =  orderByValue({data, config})
        data =  groupByKey({data, config})

        return data
    }
    else if (orderBy && order && !group) {
        data =  orderByValue({data, config})
        return data
    }
    else if (!order || !orderBy && group) {
        data =  groupByKey({data, config})
        return data
    }
    else if (!group) {
        console.error('transformation groupBy requires an group argument!')
    }
    else if (!data) {
        console.error('transformation groupBy requires an extractor to be used first')
    } else {
        return data
    }
}
export enum GroupOptions{
    State = "state",
}
export enum OrderOptions{
    Ascendent = "asc",
    Descendent = "desc",
}

export enum OrderByOptions {
    CreatedAt = "created_at",
    UpdatedAt = "updated_at",
}

export interface GroupByConfig {
    group: GroupOptions
    orderBy: OrderByOptions
    order: OrderOptions
}

export interface GroupByOptions  {
    config: GroupByConfig
    data: Brewery[]
}
