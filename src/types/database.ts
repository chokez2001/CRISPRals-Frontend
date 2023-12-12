export enum SPECIES_TYPES_ENUM {
    ALL = 'ALL',
    SOLANACEARUM = 'Solanacearum',
    PSEUDOSOLANACEARUM = 'Pseudosolanacearum',
    SYZYGII = 'Syzygii',
}

export enum CRISPR_STATUS_ENUM {
    WITH_CRISPR = 'WITH_CRISPR',
    NO_CRISPR = 'NO_CRISPR',
    NONE = 'NONE',
}

export type DATABASE_TABLE_TYPE = {
    strain: string
    assembly: string
    accessionNumber: string
    specie: string
    phylotype: string
    consensusRepeatSequences: string
    crispr: boolean
    crisprType: string
}

export type TABLE_PAGINATION = {
    currentPage: number
    totalPages: number
}
