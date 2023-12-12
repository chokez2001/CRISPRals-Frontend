import { TableRow, TableCell, Stack, Typography } from '@mui/material'
import { ReactNode } from 'react'

type Props = {
    isNotFound: boolean
    title: string
    subtitle: string
    component?: ReactNode
}

export default function TableNoData({
    isNotFound,
    title,
    subtitle,
    component,
}: Props) {
    return (
        <TableRow>
            {isNotFound ? (
                <TableCell colSpan={12}>
                    <Stack
                        alignItems="center"
                        justifyContent="center"
                        spacing={2}
                        sx={{
                            height: 432,
                        }}
                    >
                        <Typography variant="h4">{title}</Typography>
                        <Typography variant="body2">{subtitle}</Typography>
                        {component}
                    </Stack>
                </TableCell>
            ) : (
                <TableCell colSpan={12} sx={{ p: 0 }} />
            )}
        </TableRow>
    )
}
