import { gql, QueryTuple, useLazyQuery } from '@apollo/client'
import { getPolices } from '../../Apollo/getPolices'
import {
    CRISPR_STATUS_ENUM,
    DATABASE_TABLE_TYPE,
    SPECIES_TYPES_ENUM,
    TABLE_PAGINATION,
} from '../../types/database'

const GET_TABLE_DATA_QUERY = gql`
    query GetTableData(
        $currentPage: Int!
        $pageSize: Int!
        $specie: String!
        $crisprStatus: [String]!
        $strainNameOrAssembly: String!
    ) {
        getTableData(
            currentPage: $currentPage
            pageSize: $pageSize
            specie: $specie
            crisprStatus: $crisprStatus
            strainNameOrAssembly: $strainNameOrAssembly
        ) {
            pagination {
                currentPage
                totalPages
            }
            rowsData {
                strain
                assembly
                accessionNumber
                specie
                phylotype
                consensusRepeatSequences
                crispr
                crisprType
            }
        }
    }
`

interface IGetTableDataParams {
    currentPage: number
    pageSize: number
    specie: SPECIES_TYPES_ENUM | null
    crisprStatus: CRISPR_STATUS_ENUM[] | null
    strainNameOrAssembly: string
}
interface IGetTableDataResponse {
    getTableData: {
        pagination: TABLE_PAGINATION
        rowsData: DATABASE_TABLE_TYPE[]
    }
}

export const useLazyGetDataTable = (
    fromCache?: boolean
): QueryTuple<IGetTableDataResponse, IGetTableDataParams> =>
    useLazyQuery(GET_TABLE_DATA_QUERY, {
        ...getPolices(fromCache),
    })
console.log(useLazyGetDataTable)
