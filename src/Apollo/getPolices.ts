import { WatchQueryFetchPolicy } from '@apollo/client'

export interface IPolicesResponse {
    fetchPolicy?: WatchQueryFetchPolicy
    nextFetchPolicy?: WatchQueryFetchPolicy
}

export const getPolices = (fromCache?: boolean): IPolicesResponse => {
    if (fromCache) {
        return {
            fetchPolicy: 'network-only',
            nextFetchPolicy: 'cache-first',
        }
    }

    return {}
}
