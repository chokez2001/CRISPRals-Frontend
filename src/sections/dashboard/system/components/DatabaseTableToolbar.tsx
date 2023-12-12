import { Grid, InputAdornment, TextField } from '@mui/material'
import Iconify from '../../../../components/iconify'
import { useLocales } from '../../../../locales'
import CrisprStatusPopover from './CrisprStatusPopover'

type Props = {
    filterStrainNameOrAssembly: string
    onFilterStrainNameOrAssembly: (
        event: React.ChangeEvent<HTMLInputElement>
    ) => void
}

export default function DatabaseTableToolbar({
    filterStrainNameOrAssembly,
    onFilterStrainNameOrAssembly,
}: Props) {
    const { translate } = useLocales()

    return (
        <Grid
            container
            spacing={2}
            alignItems="center"
            justifyContent="center"
            sx={{ px: 2.5, py: 3 }}
        >
            <Grid item md={10}>
                <TextField
                    fullWidth
                    value={filterStrainNameOrAssembly}
                    onChange={onFilterStrainNameOrAssembly}
                    placeholder={`${translate(
                        'dashboard.database.searchText'
                    )}`}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Iconify
                                    icon="eva:search-fill"
                                    sx={{ color: 'text.disabled' }}
                                />
                            </InputAdornment>
                        ),
                    }}
                />
            </Grid>
            <Grid item md={2}>
                <CrisprStatusPopover />
            </Grid>
        </Grid>
    )
}
