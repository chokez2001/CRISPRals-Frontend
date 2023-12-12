import { ColorSchema } from '../theme/palette'

export interface ISummaryDataResponse {
    strain: {
        total: number
    }
    phage: {
        total: number
    }
    crisprArray: {
        total: number
    }
    accessionNumber: {
        total: number
    }
}

export interface IStrainSummaryResponse {
    label: string;
    withCrispr: number;
    withoutCrispr: number;
    total: number;
    percentWith: number;
    percentWithout: number;
  }

export interface ISpeciesSeriesResponse {
    label: string
    value: number
    percent: number
}

export interface ISummaryData {
    title: string
    total: number
    icon: string
    color: ColorSchema
}
