import { ApexOptions } from 'apexcharts'
import sumBy from 'lodash/sumBy'
import { useTheme, alpha } from '@mui/material/styles'
import {
    Card,
    CardHeader,
    Stack,
    Box,
    Typography,
    CardProps,
} from '@mui/material'
import { fNumber } from '../../../../utils/formatNumber'
import Chart, { useChart } from '../../../../components/chart'

type ItemProps = {
    label: string
    value: number
}

interface Props extends CardProps {
    subheader?: string
    chart: {
        colors?: string[]
        series: ItemProps[]
        options?: ApexOptions
    }
}

export default function PhagesInCRISPRAnalytic({
    subheader,
    chart,
    ...other
}: Props) {
    const theme = useTheme()

    const { colors, series, options } = chart

    const total = sumBy(series, 'value')

    const chartSeries =
        (series.filter((i) => i.label === 'In CRISPR')[0].value / total) * 100

    const chartColors = colors || [
        theme.palette.primary.light,
        theme.palette.primary.main,
    ]

    const chartOptions = useChart({
        legend: {
            show: false,
        },
        grid: {
            padding: { top: -32, bottom: -32 },
        },
        fill: {
            type: 'gradient',
            gradient: {
                colorStops: [chartColors].map((colr) => [
                    { offset: 0, color: colr[0] },
                    { offset: 100, color: colr[1] },
                ]),
            },
        },
        plotOptions: {
            radialBar: {
                hollow: { size: '64%' },
                dataLabels: {
                    name: { offsetY: -16 },
                    value: { offsetY: 8 },
                    total: {
                        label: 'Total phages',
                        formatter: () => fNumber(total),
                    },
                },
            },
        },
        ...options,
    })

    return (
        <Card {...other}>
            <Chart
                type="radialBar"
                series={[chartSeries]}
                options={chartOptions}
                height={310}
            />

            <Stack spacing={2} sx={{ p: 5 }}>
                {series.map((item) => (
                    <Legend key={item.label} item={item} />
                ))}
            </Stack>
        </Card>
    )
}

type LegendProps = {
    item: ItemProps
}

function Legend({ item }: LegendProps) {
    return (
        <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
        >
            <Stack direction="row" alignItems="center" spacing={1}>
                <Box
                    sx={{
                        width: 16,
                        height: 16,
                        bgcolor: (theme) =>
                            alpha(theme.palette.grey[500], 0.16),
                        borderRadius: 0.75,
                        ...(item.label === 'In CRISPR' && {
                            bgcolor: 'primary.main',
                        }),
                    }}
                />

                <Typography
                    variant="subtitle2"
                    sx={{ color: 'text.secondary' }}
                >
                    {item.label}
                </Typography>
            </Stack>

            <Typography variant="subtitle1"> {item.value} Phages</Typography>
        </Stack>
    )
}
