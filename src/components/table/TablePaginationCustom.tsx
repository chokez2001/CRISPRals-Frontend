import { Box, Stack, Pagination, PaginationProps } from '@mui/material'
import { useDispatch } from 'react-redux'
import { setPagination } from '../../redux/slices/filtersSlice'
import { useAppSelector } from '../../redux/store'

export default function TablePaginationCustom({ ...other }: PaginationProps) {
    const pagination = useAppSelector((state) => state.filters.pagination)
    const dispatch = useDispatch()

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        dispatch(
            setPagination({
                currentPage: value,
                totalPages: pagination.totalPages,
            })
        )
    }
    return (
        <Box sx={{ position: 'relative', height: 52 }}>
            <Stack alignItems="flex-end" justifyContent="center" height="100%">
                <Pagination
                    shape="circular"
                    onChange={handleChange}
                    page={pagination.currentPage}
                    {...other}
                />
            </Stack>
        </Box>
    )
}
