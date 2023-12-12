import { alpha, useTheme } from '@mui/material/styles'
import { CardProps, Grid, Card, Typography } from '@mui/material'
import { ColorSchema } from '../../../theme/palette'
import Iconify from '../../../components/iconify'
import { bgGradient } from '../../../utils/cssStyles'
import { fShortenNumber } from '../../../utils/formatNumber'
import { ISummaryData } from '../../../types/statistics'

type props = {
    arraySummaryData: ISummaryData[]
}

export default function SystemSummary({ arraySummaryData }: props) {
    return (
        <>
            {arraySummaryData.map((data) => (
                <Grid key={data.title} item xs={12} sm={6} md={3}>
                    <AnalyticsWidgetSummary
                        title={data.title}
                        total={data.total}
                        icon={data.icon}
                        color={data.color}
                    />
                </Grid>
            ))}
        </>
    )
}

interface Props extends CardProps {
    title: string
    total: number
    icon: string
    color?: ColorSchema
}

function AnalyticsWidgetSummary({
    title,
    total,
    icon,
    color = 'primary',
    sx,
    ...other
}: Props) {
    const theme = useTheme()

    return (
        <Card
            sx={{
                py: 5,
                boxShadow: 0,
                textAlign: 'center',
                color: theme.palette[color].darker,
                bgcolor: theme.palette[color].lighter,
                ...sx,
            }}
            {...other}
        >
            <Iconify
                icon={icon}
                sx={{
                    mb: 3,
                    p: 2.5,
                    width: 64,
                    height: 64,
                    borderRadius: '50%',
                    color: theme.palette[color].dark,
                    ...bgGradient({
                        direction: '135deg',
                        startColor: `${alpha(theme.palette[color].dark, 0)} 0%`,
                        endColor: `${alpha(
                            theme.palette[color].dark,
                            0.24
                        )} 100%`,
                    }),
                }}
            />

            <Typography variant="h3">{fShortenNumber(total)}</Typography>

            <Typography variant="subtitle2" sx={{ opacity: 0.64 }}>
                {title}
            </Typography>
        </Card>
    )
}
