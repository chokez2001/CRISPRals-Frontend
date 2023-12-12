import {
    TableRow,
    TableCell,
    Skeleton,
    Stack,
    TableRowProps,
} from '@mui/material'

export default function TableSkeleton({ ...other }: TableRowProps) {
    return (
        <TableRow {...other}>
            <TableCell colSpan={12}>
                <Stack spacing={3} direction="row" alignItems="center">
                    <Skeleton variant="text" width="100%" height={80} />
                    <Skeleton variant="text" width="100%" height={80} />
                    <Skeleton variant="text" width="100%" height={80} />
                    <Skeleton variant="text" width="100%" height={80} />
                    <Skeleton variant="text" width="100%" height={80} />
                </Stack>
            </TableCell>
        </TableRow>
    )
}
