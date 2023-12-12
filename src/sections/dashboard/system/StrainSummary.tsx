import {
    Card,
    CardHeader,
    Stack,
    LinearProgress,
    CardProps,
    Typography,
    Grid,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Box,
} from '@mui/material';
import { useLocales } from '../../../locales';
import { IStrainSummaryResponse } from '../../../types/statistics';
import Scrollbar from '../../../components/scrollbar'
import { fPercent, fShortenNumber } from 'src/utils/formatNumber';

interface StrainStatisticsTableProps {
    data: IStrainSummaryResponse[];
}

interface Props extends CardProps {
    title?: string;
    subheader?: string;
    data: IStrainSummaryResponse[];
}

type StrainSummaryProps = {
    strainSummaryData: IStrainSummaryResponse[];
};

export default function StrainSummary({ strainSummaryData }: StrainSummaryProps) {
    const { translate } = useLocales();

    return (
        <Grid item xs={12} md={6} lg={6}>
            <StrainStatistics
                title={`${translate('dashboard.statistics.strain')}`}
                data={strainSummaryData}
            />
        </Grid>
    );
}

function StrainStatisticsTable({ data }: StrainStatisticsTableProps) {
    return (
        <TableContainer component={Paper}>
            <Scrollbar>
                <Table size="medium" >
                    <TableHead>
                        <TableRow>
                            <TableCell></TableCell>
                            <TableCell>with CRISPR</TableCell>
                            <TableCell>without CRISPR</TableCell>
                            <TableCell>Total</TableCell>
                            <TableCell>% with</TableCell>
                            <TableCell>% without</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((stats) => (
                            <TableRow hover key={stats.label}>
                                <TableCell>
                                    <Typography variant="body1" sx={{ fontStyle: 'italic' }}>
                                        {stats.label}
                                    </Typography>
                                </TableCell>
                                <TableCell>{stats.withCrispr}</TableCell>
                                <TableCell>{stats.withoutCrispr}</TableCell>
                                <TableCell>{stats.total}</TableCell>
                                <TableCell>{stats.percentWith}</TableCell>
                                <TableCell>{stats.percentWithout}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Scrollbar>
        </TableContainer>
    );
}

type StrainStatisticsGraphProps = {
    data: IStrainSummaryResponse[];
};

function StrainStatisticsGraph({ data }: StrainStatisticsGraphProps) {

    const totalWithCrispr = data.reduce((acc, item) => acc + item.withCrispr, 0);
    const totalWithoutCrispr = data.reduce((acc, item) => acc + item.withoutCrispr, 0);

    return (
        <Card>
            <CardHeader />
            <Box p={4} >
                <Stack spacing={1}>
                    <Stack direction="row" alignItems="center" >
                        <Typography variant="subtitle2" sx={{ flexGrow: 1 }}>
                            With CRISPR Defense System
                        </Typography>
                        <Typography variant="subtitle2">
                            {fShortenNumber(totalWithCrispr)}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            &nbsp;({fPercent((totalWithCrispr / (totalWithCrispr + totalWithoutCrispr)) * 100)})
                        </Typography>
                    </Stack>
                    <LinearProgress
                        variant="determinate"
                        value={(totalWithCrispr / (totalWithCrispr + totalWithoutCrispr)) * 100}
                        color="info"
                    />
                </Stack>
                <Box sx={{ mt: 4 }} />
                <Stack spacing={1}>
                    <Stack direction="row" alignItems="center">
                        <Typography variant="subtitle2" sx={{ flexGrow: 1 }}>
                            Without CRISPR Defense System
                        </Typography>
                        <Typography variant="subtitle2">
                            {fShortenNumber(totalWithoutCrispr)}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            &nbsp;({fPercent((totalWithoutCrispr / (totalWithCrispr + totalWithoutCrispr)) * 100)})
                        </Typography>
                    </Stack>
                    <LinearProgress
                        variant="determinate"
                        value={(totalWithoutCrispr / (totalWithCrispr + totalWithoutCrispr)) * 100}
                        color="warning"
                    />
                </Stack>
            </Box>
        </Card>
    );
}

function StrainStatistics({ title, subheader, data, ...other }: Props) {
    return (
        <Card {...other}>
            <CardHeader title={title} subheader={subheader} sx={{p:2}}/>
            <Stack direction="column"  >
                <StrainStatisticsTable data={data} />
                <StrainStatisticsGraph data={data} />
            </Stack>

        </Card>
    );
}
