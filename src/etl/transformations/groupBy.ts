export default function groupBy<T>(config: GroupByConfig, data: T[]): any {
  const { group, order, orderBy } = config;

  if (!data) {
    console.error('transformation groupBy requires an extractor to be used first');
    return data;
  }

  if (orderBy) {
    data = orderByValue(config, data);
  }

  if (group) {
    if (!group.trim()) {
      console.error('transformation groupBy requires a group argument!');
      return data;
    }
    data = groupByKey(config, data);
  }

  return data;
}

const groupByKey = <T>(config: GroupByConfig, data: T[]): Record<string, T[]> =>
  data.reduce((result, item) => {
    const key = item[config.group];
    result[key] = [...(result[key] || []), item];
    return result;
  }, {});

const orderByValue = <T>(config: GroupByConfig, data: T[]): T[] => {
  const { order, orderBy } = config;
  const orderMultiplier = order === OrderOptions.Ascendent ? 1 : -1;
  return data.sort((a, b) => (a[orderBy] > b[orderBy] ? orderMultiplier : -orderMultiplier));
};

export enum GroupOptions {
  State = 'state'
  /* we could allow to group by any key that
    makes sense/is shaed between objects really,
    adding it here. */
}
export enum OrderOptions {
  Ascendent = 'asc',
  Descendent = 'desc'
}

export enum OrderByOptions {
  Id = 'id',
  CreatedAt = 'createdAt',
  UpdatedAt = 'updatedAt',
  PostalCode = 'postalCode'
}

export interface GroupByConfig {
  group: GroupOptions
  orderBy: OrderByOptions
  order: OrderOptions
}

export interface GroupByOptions {
  config: GroupByConfig
  data: T[]
}
