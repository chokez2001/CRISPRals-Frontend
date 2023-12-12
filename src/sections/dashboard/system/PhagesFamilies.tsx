import React from 'react';
import { Card, CardHeader, CardProps, Grid, Typography } from '@mui/material';
import { useTheme, styled } from '@mui/material/styles';
import Chart, { useChart } from '../../../components/chart';
import { fNumber } from '../../../utils/formatNumber';
import { useLocales } from '../../../locales'

interface PhagePieChartProps extends CardProps {}

const CHART_HEIGHT = 400;
const LEGEND_HEIGHT = 72;

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
}));

function PhagePieChart(props: PhagePieChartProps) {
  const theme = useTheme();
  const { translate } = useLocales()

  const phageData = [
    { label: 'Autographiviridae', value: 8 },
    { label: 'Myoviridae', value: 27 },
    { label: 'Podoviridae', value: 39 },
    { label: 'Kantovirinae', value: 3 },
    { label: 'Peduoviridae', value: 57 },
    { label: 'Zierdtviridae', value: 4 },
    { label: 'Drexlerviridae', value: 2 },
    { label: 'Ackermannviridae', value: 1 },
    { label: 'Vequintavirinae', value: 1 },
    { label: 'no family', value: 10 },
    { label: 'Siphoviridae', value: 84 },
    { label: 'Inoviridae', value: 19 },
  ];

  const threshold = 27; 
  const filteredData = phageData.filter((entry) => entry.value >= threshold);
  const otherFamilies: { label: string }[] = phageData
    .filter((entry) => entry.value < threshold)
    .map((entry) => ({ label: entry.label }));
  const sumOfOthers = phageData
    .filter((entry) => entry.value < threshold)
    .reduce((sum, entry) => sum + entry.value, 0);

  const groupedData = [...filteredData, { label:  `${translate('dashboard.statistics.otherLabel')}`, value: sumOfOthers }];

  const chartSeries = groupedData.map((i) => i.value);

  const chartOptions = useChart({
    chart: {
      sparkline: {
        enabled: true,
      },
      animations: {
        enabled: false,
      },
    },
    colors: [
      theme.palette.primary.main,
      theme.palette.warning.main,
      theme.palette.info.main,
    ],
    labels: groupedData.map(
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
  });

  return (
    <Grid item xs={12} md={6} lg={6}>
      <Card {...props}>
        <CardHeader title={`${translate('dashboard.statistics.phages')}`}/>
        <StyledChart dir="ltr">
          <Chart
            type="pie"
            series={chartSeries}
            options={chartOptions}
            height={280}
          />
        </StyledChart>
        <Typography variant="body2" color="textSecondary" paddingX={3}>
        {`${translate('dashboard.statistics.otherLabel')}: `}
        {`${translate('dashboard.statistics.otherLabel')}: `}
        {(otherFamilies as { label: string }[]).map(({ label }, index) => (
        <React.Fragment key={index}>
          {index > 0 && ', '}
          {label}
          {label === 'no family' && <sup>1</sup>}
        </React.Fragment>
          ))}
                </Typography>
        <Typography variant="body2" color="textSecondary" padding={3}>
          <sup>1</sup>{`${translate('dashboard.statistics.phagesFooter')}`}
        </Typography>
      </Card>
    </Grid>
  );
}

export default PhagePieChart;
