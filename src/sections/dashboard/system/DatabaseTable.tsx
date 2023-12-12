import {
    Tab,
    Tabs,
    Card,
    Table,
    Divider,
    TableBody,
    TableContainer,
    Typography,
    Tooltip,
} from '@mui/material'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { useDispatch } from 'react-redux'
import { useAppSelector } from '../../../redux/store'
import {
    setSpeciesType,
    setStrainNameOrAssembly,
} from '../../../redux/slices/filtersSlice'
import { SPECIES_TYPES_ENUM } from '../../../types/database'
import Label from '../../../components/label'
import DatabaseTableToolbar from './components/DatabaseTableToolbar'
import Scrollbar from '../../../components/scrollbar'
import {
    emptyRows,
    TableEmptyRows,
    TableHeadCustom,
    TableNoData,
    TablePaginationCustom,
    TableSkeleton,
    useTable,
} from '../../../components/table'
import DatabaseTableRow from './components/DatabaseTableRow'
import { ISpeciesSeriesResponse } from '../../../types/statistics'
import { useLazyGetDataTable } from '../../../GraphQl/Queries/getTableData'
import { useEffect } from 'react'
import Page500 from '../../../components/errors/505'

const TABLE_HEAD = [
    { id: 'strainName', label: 'Strain name', align: 'left' },
    { id: 'assembly', label: 'Assembly', align: 'left' },
    { id: 'accessionNumber', label: 'Accession Number', align: 'left' },
    { id: 'specie', label: 'Specie', align: 'center' },
    { id: 'phylotype', label: 'Phylotype', align: 'center', width: 140 },
    {
        id: 'sequevar',
        label: 'Consensus repeat sequences',
        align: 'center',
        width: 140,
    },
    { id: 'status', label: 'CRISPR Array', align: 'center' },
    { id: 'crisprType', label: 'CRISPR Type', align: 'center' },
    { id: 'view', label: 'view', align: 'left' },
]
type props = {
    speciesSeries: ISpeciesSeriesResponse[]
}

export default function DatabaseTable({ speciesSeries }: props) {
    const totalSpecies =
        speciesSeries[0]?.value +
        speciesSeries[1]?.value +
        speciesSeries[2]?.value
    const filters = useAppSelector((state) => state.filters)
    const dispatch = useDispatch()

    const [getDataTable, { data, loading, error }] = useLazyGetDataTable(true)

    const { order, orderBy } = useTable({
        defaultOrderBy: 'strainName',
    })

    const TABS = [
        { value: 'ALL', label: 'All', color: 'success', count: totalSpecies },
        {
            value: SPECIES_TYPES_ENUM.SOLANACEARUM,
            label: 'R. solanacearum',
            color: 'primary',
            count: speciesSeries[0]?.value,
        },
        {
            value: SPECIES_TYPES_ENUM.PSEUDOSOLANACEARUM,
            label: 'R. pseudosolanacearum',
            color: 'warning',
            count: speciesSeries[1]?.value,
        },
        {
            value: SPECIES_TYPES_ENUM.SYZYGII,
            label: 'R. syzygii',
            color: 'info',
            count: speciesSeries[2]?.value,
        },
    ] as const

    const rowsData = data?.getTableData.rowsData || []

    useEffect(() => {
        getDataTable({
            variables: {
                currentPage: filters.pagination.currentPage,
                pageSize: 5,
                specie: filters.speciesTypes,
                crisprStatus: filters.crisprStatus,
                strainNameOrAssembly: filters.strainNameOrAssembly,
            },
        })
    }, [getDataTable, filters])
    if (error) {
        return <Page500 />
    }

    return (
        <Card>
            <Tabs
                value={filters.speciesTypes || 'ALL'}
                onChange={(_, documentType) =>
                    dispatch(setSpeciesType(documentType))
                }
                sx={{
                    px: 2,
                }}
            >
                {TABS.map((tab) => (
                    <Tab
                        key={tab.value}
                        value={tab.value}
                        label={
                            <Typography
                                variant="subtitle2"
                                textTransform="none"
                                fontStyle={tab.value != 'ALL' ? 'italic' : ''}
                            >
                                {tab.label}
                            </Typography>
                        }
                        icon={
                            <Label color={tab.color} sx={{ mr: 1 }}>
                                {tab.count}
                            </Label>
                        }
                    />
                ))}
            </Tabs>
            <Divider />
            <DatabaseTableToolbar
                filterStrainNameOrAssembly={filters.strainNameOrAssembly}
                onFilterStrainNameOrAssembly={(event) =>
                    dispatch(setStrainNameOrAssembly(event.target.value))
                }
            />
            <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
                <Scrollbar>
                    <Table size="medium" sx={{ minWidth: 800 }}>
                        <TableHeadCustom
                            order={order}
                            orderBy={orderBy}
                            headLabel={TABLE_HEAD}
                        />
                        <TableBody>
                            {rowsData.map((row) => (
                                <DatabaseTableRow
                                    key={row.assembly}
                                    row={row}
                                />
                            ))}
                            <TableEmptyRows
                                emptyRows={emptyRows(
                                    data?.getTableData.pagination.currentPage ||
                                        1,
                                    5,
                                    5
                                )}
                            />

                            {loading && !rowsData.length ? (
                                <TableSkeleton />
                            ) : (
                                <TableNoData
                                    title="No data found"
                                    subtitle="You can change the filters"
                                    isNotFound={!rowsData.length}
                                />
                            )}
                        </TableBody>
                    </Table>
                </Scrollbar>
                <Tooltip
                    title="Scroll right to view more columns"
                    arrow
                    placement="left"
                >
                    <div
                        style={{
                            position: 'absolute',
                            top: '0%',
                            right: '1%',
                            transform: 'translateY(-50%)',
                        }}
                    >
                        <ArrowForwardIcon />
                    </div>
                </Tooltip>
            </TableContainer>
            {(!loading || rowsData.length > 0) && (
                <TablePaginationCustom
                    color="standard"
                    count={data?.getTableData.pagination.totalPages}
                />
            )}
        </Card>
    )
}
