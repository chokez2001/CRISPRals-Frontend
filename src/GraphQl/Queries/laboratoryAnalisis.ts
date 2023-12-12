import { gql, QueryTuple, useLazyQuery } from '@apollo/client'
import { getPolices } from '../../Apollo/getPolices'

const LaboratoryAnalysis = gql`
    query LaboratoryAnalysis($fastaContent: [String!], $analysisType: String!) {
        laboratoryAnalysis(
            fastaContent: $fastaContent
            analysisType: $analysisType
        ) {
            fastaAnalisis
            zipFiles
            casSummary
            spacers
        }
    }
`

const GetUselessPhages = gql`
  query GetUselessPhages($spacers: [String!]) {
    getUselessPhages(
        spacers: $spacers
        )  {
        uselessPhages
    }
  }
`


interface ILaboratoryAnalysisParams {
    fastaContent: string[]
    analysisType: string
}

interface ILaboratoryAnalysisResponse {
    laboratoryAnalysis: {
        fastaAnalisis: string[]
        zipFiles: string[]
        casSummary: string[]
        spacers: string[]
    }
}



interface GetPossiblePhagesParams {
    spacers: string[];
  }
  
  interface GetPossiblePhagesResponse {
    getUselessPhages: {
      uselessPhages: string[];
    };
  }
  



export const useLazyLaboratoryAnalysis = (
    fromCache?: boolean
): QueryTuple<ILaboratoryAnalysisResponse, ILaboratoryAnalysisParams> =>
    useLazyQuery(LaboratoryAnalysis, {
        ...getPolices(fromCache),
    })




export const useLazyGetUselessPhages = (
    fromCache?: boolean
    ): QueryTuple<GetPossiblePhagesResponse, GetPossiblePhagesParams> =>
    useLazyQuery(GetUselessPhages, {
        ...getPolices(fromCache),
    });