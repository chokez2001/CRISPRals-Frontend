import { gql, QueryTuple, useLazyQuery } from '@apollo/client'
import { getPolices } from '../../Apollo/getPolices'

const GET_STRAIN_DETAILS_BY_ASSEMBLY = gql`
    query GetInformationByAssembly($assembly: String!) {
        getInformationByAssembly(assembly: $assembly) {
            strain
            assembly
            accessionNumberRf
            accessionNumberGenBank
            specie
            phylotype
            consensusRepeatSequences
            phagesInCrisprArray
            availablePhages
            lengthCrisprArray
            listPotentialPhages {
                phageName
            }
            isCrispr
            crisprType
            observation
            scoreCrisprIdentify
        }
    }
`

interface IGetStrainDetailsByAssemblyParams {
    assembly: string
}

interface IGetStatisticsResponse {
    getInformationByAssembly: {
        strain: string
        assembly: string
        accessionNumberRf: string
        accessionNumberGenBank: string
        specie: string
        phylotype: string
        consensusRepeatSequences: string
        phagesInCrisprArray: string[]
        availablePhages: number
        lengthCrisprArray: number
        listPotentialPhages: {
            phageName: string
        }[]
        isCrispr: boolean
        crisprType: string
        observation: string
        scoreCrisprIdentify: number
    }
}

export const useLazyGetStrainDetailsByAssembly = (
    fromCache?: boolean
): QueryTuple<IGetStatisticsResponse, IGetStrainDetailsByAssemblyParams> =>
    useLazyQuery(GET_STRAIN_DETAILS_BY_ASSEMBLY, {
        ...getPolices(fromCache),
    })
