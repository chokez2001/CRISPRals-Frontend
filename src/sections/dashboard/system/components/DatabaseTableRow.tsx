import { Stack, TableRow, TableCell, Typography } from '@mui/material'
import { useDispatch } from 'react-redux'
import Iconify from '../../../../components/iconify'
import Label from '../../../../components/label'
import { setDialog } from '../../../../redux/slices/dialogSlice'
import { DATABASE_TABLE_TYPE } from '../../../../types/database'

type Props = {
    row: DATABASE_TABLE_TYPE
}

export default function DatabaseTableRow({ row }: Props) {
    const {
        strain,
        assembly,
        accessionNumber,
        specie,
        phylotype,
        consensusRepeatSequences,
        crispr,
        crisprType,
    } = row
    const dispatch = useDispatch()

    return (
        <TableRow hover>
            <TableCell>
                <Stack direction="row" alignItems="center" spacing={2}>
                    <Typography variant="subtitle2" noWrap>
                        {strain}
                    </Typography>
                </Stack>
            </TableCell>

            <TableCell align="left">{assembly}</TableCell>

            <TableCell align="left">{accessionNumber}</TableCell>

            <TableCell align="center">{specie}</TableCell>

            <TableCell align="center">{phylotype}</TableCell>

            <TableCell align="left">{consensusRepeatSequences}</TableCell>

            <TableCell align="center">
                <Label
                    variant="soft"
                    color={
                        crispr === true
                            ? 'success'
                            : crispr === false
                            ? 'error'
                            : 'warning'
                    }
                >
                    {crispr === true
                        ? 'Yes'
                        : crispr === false
                        ? 'No'
                        : 'Maybe'}
                </Label>
            </TableCell>

            <TableCell align="center">{crisprType}</TableCell>

            <TableCell align="center">
                <Iconify
                    onClick={() => {
                        dispatch(setDialog({ assembly }))
                    }}
                    color="primary.main"
                    icon="eva:eye-fill"
                    sx={{ cursor: 'pointer' }}
                />
            </TableCell>
        </TableRow>
    )
}
