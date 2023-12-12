import { ApexOptions } from 'apexcharts'
import { useTheme, styled } from '@mui/material/styles'
import { Card, CardHeader, CardProps, Grid } from '@mui/material'
import { fNumber } from '../../../utils/formatNumber'
import Chart, { useChart } from '../../../components/chart'
import { useLocales } from '../../../locales'
import { ISpeciesSeriesResponse } from '../../../types/statistics'

type Props = {
    seriesData: ISpeciesSeriesResponse[]
}

export default function AnalyticsTypes({ seriesData }: Props) {
    const theme = useTheme()

    const { translate } = useLocales()

    return (
        <Grid item xs={12} md={6} lg={6}>
            <AnalyticsSpecies
                raised
                title={`${translate('dashboard.statistics.species')}`}
                chart={{
                    series: seriesData,
                    colors: [
                        theme.palette.primary.main,
                        theme.palette.warning.main,
                        theme.palette.info.main,
                    ],
                }}
            />
        </Grid>
    )
}

interface AnalyticsSpeciesProps extends CardProps {
    title?: string
    subheader?: string
    chart: {
        colors?: string[]
        series: {
            label: string
            value: number
        }[]
        options?: ApexOptions
    }
}

const CHART_HEIGHT = 400

const LEGEND_HEIGHT = 72

const StyledChart = styled('div')(({ theme }) => ({
    height: CHART_HEIGHT,
    marginTop: theme.spacing(5),
    '& .apexcharts-canvas svg': {
        height: CHART_HEIGHT,
    },
    '& .apexcharts-canvas svg,.apexcharts-canvas foreignObject': {
        overflow: 'visible',
    },
    '& .apexcharts-legend': {
        height: LEGEND_HEIGHT,
        alignContent: 'center',
        position: 'relative !important' as 'relative',
        borderTop: `solid 1px ${theme.palette.divider}`,
        top: `calc(${CHART_HEIGHT - LEGEND_HEIGHT}px) !important`,
    },
}))

function AnalyticsSpecies({
    title,
    subheader,
    chart,
    ...other
}: AnalyticsSpeciesProps) {
    const theme = useTheme()

    const { colors, series, options } = chart

    const chartSeries = series.map((i) => i.value)

    const chartOptions = useChart({
        chart: {
            sparkline: {
                enabled: true,
            },
        },
        colors,
        labels: series.map(
            (i) => `<span style="font-style: italic;">${i.label}</span>`
        ),
        stroke: {
            colors: [theme.palette.background.paper],
        },
        legend: {
            floating: true,
            horizontalAlign: 'center',
        },
        dataLabels: {
            enabled: true,
            dropShadow: { enabled: false },
        },
        tooltip: {
            fillSeriesColor: false,
            y: {
                formatter: (value: number) => fNumber(value),
                title: {
                    formatter: (seriesName: string) => `${seriesName}`,
                },
            },
        },
        plotOptions: {
            pie: { donut: { labels: { show: false } } },
        },
        ...options,
    })

    return (
        <Card {...other}>
            <CardHeader title={title} subheader={subheader} />

            <StyledChart dir="ltr">
                <Chart
                    type="pie"
                    series={chartSeries}
                    options={chartOptions}
                    height={280}
                />
            </StyledChart>
        </Card>
    )
}
