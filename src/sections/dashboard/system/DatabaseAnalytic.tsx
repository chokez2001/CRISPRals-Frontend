import { alpha } from '@mui/material/styles'
import {
    Stack,
    Typography,
    Box,
    CircularProgress,
    Card,
    Divider,
} from '@mui/material'
import { fShortenNumber } from '../../../utils/formatNumber'
import Iconify from '../../../components/iconify'
import Scrollbar from '../../../components/scrollbar'
import { useLocales } from '../../../locales'
import { ISpeciesSeriesResponse } from '../../../types/statistics'

type Props = {
    icon: string
    title: string
    total: number
    percent: number
    color?: string
}
type props = {
    speciesSeries: ISpeciesSeriesResponse[]
}
export default function DatabaseAnalytic({ speciesSeries }: props) {
    const totalSpecies =
        speciesSeries[0]?.value +
        speciesSeries[1]?.value +
        speciesSeries[2]?.value
    const databaseSummary = [
        {
            title: 'Total',
            total: totalSpecies,
            percent: 100,
            icon: 'tabler:file-database',
            color: 'secondary.main',
        },
        {
            title: speciesSeries[0]?.label,
            total: speciesSeries[0]?.value,
            percent: speciesSeries[0]?.percent,
            icon: 'healthicons:dna-outline',
            color: 'primary.main',
        },
        {
            title: speciesSeries[1]?.label,
            total: speciesSeries[1]?.value,
            percent: speciesSeries[1]?.percent,
            icon: 'healthicons:dna-outline',
            color: 'warning.main',
        },
        {
            title: speciesSeries[2]?.label,
            total: speciesSeries[2]?.value,
            percent: speciesSeries[2]?.percent,
            icon: 'healthicons:dna-outline',
            color: 'info.main',
        },
    ]
    return (
        <Card sx={{ mb: 5 }}>
            <Scrollbar>
                <Stack
                    direction="row"
                    divider={
                        <Divider
                            orientation="vertical"
                            flexItem
                            sx={{ borderStyle: 'dashed' }}
                        />
                    }
                    sx={{ py: 2 }}
                >
                    {databaseSummary.map((dataDatabase) => (
                        <DocumentAnalytic
                            key={dataDatabase.title}
                            title={dataDatabase.title}
                            total={dataDatabase.total}
                            percent={dataDatabase.percent}
                            icon={dataDatabase.icon}
                            color={dataDatabase.color}
                        />
                    ))}
                </Stack>
            </Scrollbar>
        </Card>
    )
}

function DocumentAnalytic({ title, total, icon, color, percent }: Props) {
    const { translate } = useLocales()
    return (
        <Stack
            direction="row"
            alignItems="center"
            justifyContent="center"
            sx={{ width: 1, minWidth: 200 }}
        >
            <Stack
                alignItems="center"
                justifyContent="center"
                sx={{ position: 'relative' }}
            >
                <Iconify
                    icon={icon}
                    width={24}
                    sx={{ color, position: 'absolute' }}
                />

                <CircularProgress
                    variant="determinate"
                    value={percent}
                    size={56}
                    thickness={4}
                    sx={{ color, opacity: 0.48 }}
                />

                <CircularProgress
                    variant="determinate"
                    value={100}
                    size={56}
                    thickness={4}
                    sx={{
                        top: 0,
                        left: 0,
                        opacity: 0.48,
                        position: 'absolute',
                        color: (theme) => alpha(theme.palette.grey[500], 0.16),
                    }}
                />
            </Stack>

            <Stack spacing={0.5} sx={{ ml: 2 }}>
             <Typography style={{ fontStyle: title !== "Total" ? "italic" : "" }} variant="h6">{title}</Typography>

                <Typography variant="subtitle2">
                    {fShortenNumber(total)}{' '}
                    <Box
                        component="span"
                        sx={{ color: 'text.secondary', typography: 'body2' }}
                    >
                        {`${translate('dashboard.database.registers')}`}
                    </Box>
                </Typography>

                <Typography variant="subtitle2" sx={{ color }}>
                    {`${percent} %`}
                </Typography>
            </Stack>
        </Stack>
    )
}
