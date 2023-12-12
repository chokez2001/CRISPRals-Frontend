import { gql, QueryTuple, useLazyQuery } from '@apollo/client'
import { getPolices } from '../../Apollo/getPolices'
import {
    ISpeciesSeriesResponse,
    IStrainSummaryResponse,
    ISummaryDataResponse,
} from '../../types/statistics'

const GET_STATISTICS_QUERY = gql`
    query GET_STATISTICS_QUERY {
        getStatistics {
            seriesData {
                label
                value
                percent
            }
            summaryData {
                strain {
                    total
                }
                phage {
                    total
                }
                crisprArray {
                    total
                }
                accessionNumber {
                    total
                }
            }
            summaryStrain {
                label
                withCrispr
                withoutCrispr
                total
                percentWith
                percentWithout
            }
        }
    }
`

interface IGetStatisticsResponse {
    getStatistics: {
        seriesData: ISpeciesSeriesResponse[]
        summaryData: ISummaryDataResponse
        summaryStrain: IStrainSummaryResponse[]
    }
}

export const useLazyGetStatistics = (
    fromCache?: boolean
): QueryTuple<IGetStatisticsResponse, Record<string, never>> =>
    useLazyQuery(GET_STATISTICS_QUERY, {
        ...getPolices(fromCache),
    })
