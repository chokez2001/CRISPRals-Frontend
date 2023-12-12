import { createSlice, PayloadAction, SliceCaseReducers } from '@reduxjs/toolkit'
import {
    CRISPR_STATUS_ENUM,
    SPECIES_TYPES_ENUM,
    TABLE_PAGINATION,
} from '../../types/database'

export interface IFILTERS {
    speciesTypes: SPECIES_TYPES_ENUM | null
    crisprStatus: CRISPR_STATUS_ENUM[]
    strainNameOrAssembly: string
    pagination: TABLE_PAGINATION
}

const initialState: IFILTERS = {
    speciesTypes: SPECIES_TYPES_ENUM.ALL,
    crisprStatus: [
        CRISPR_STATUS_ENUM.NO_CRISPR,
        CRISPR_STATUS_ENUM.WITH_CRISPR,
        CRISPR_STATUS_ENUM.NONE,
    ],
    strainNameOrAssembly: '',
    pagination: {
        currentPage: 1,
        totalPages: 12,
    },
}

export const filterSlice = createSlice<IFILTERS, SliceCaseReducers<IFILTERS>>({
    name: 'filters',
    initialState,
    reducers: {
        setSpeciesType: (
            state,
            { payload }: PayloadAction<SPECIES_TYPES_ENUM>
        ) => {
            state.pagination.currentPage = 1
            state.speciesTypes = payload
        },
        setPagination: (
            state,
            { payload }: PayloadAction<TABLE_PAGINATION>
        ) => {
            state.pagination = payload
        },
        setCrisprStatus: (
            state,
            { payload }: PayloadAction<CRISPR_STATUS_ENUM>
        ) => {
            if (state.crisprStatus.includes(payload)) {
                state.pagination.currentPage = 1
                state.crisprStatus = state.crisprStatus.filter(
                    (element) => element !== payload
                )
            } else {
                state.pagination.currentPage = 1
                state.crisprStatus.push(payload)
            }
        },
        resetCrisprStatus: (state) => {
            state.pagination.currentPage = 1
            state.crisprStatus = initialState.crisprStatus
        },
        setStrainNameOrAssembly: (
            state,
            { payload }: PayloadAction<string>
        ) => {
            state.pagination.currentPage = 1
            state.strainNameOrAssembly = payload
        },
    },
})

export const {
    setPagination,
    setSpeciesType,
    setCrisprStatus,
    setStrainNameOrAssembly,
    resetCrisprStatus,
} = filterSlice.actions

export default filterSlice.reducer
