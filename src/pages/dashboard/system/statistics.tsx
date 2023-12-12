import Head from 'next/head'
import { Container, Grid } from '@mui/material'
import DashboardLayout from '../../../layouts/dashboard'
import { useSettingsContext } from '../../../components/settings'
import SystemSummary from '../../../sections/dashboard/system/SystemSummary'
import { useLocales } from '../../../locales'
import AnalyticsTypes from '../../../sections/dashboard/system/AnalyticsTypes'
import StrainSummary from '../../../sections/dashboard/system/StrainSummary'
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs'
import { PATH_DASHBOARD } from '../../../routes/paths'
import { ISummaryData } from '../../../types/statistics'
import { useLazyGetStatistics } from '../../../GraphQl/Queries/getStatistics'
import { useEffect } from 'react'
import LoadingScreen from '../../../components/loading-screen/LoadingScreen'
import Page500 from '../../../components/errors/505'
import PhagePieChart from 'src/sections/dashboard/system/PhagesFamilies'

Statistics.getLayout = (page: React.ReactElement) => (
    <DashboardLayout>{page}</DashboardLayout>
)

export default function Statistics() {
    const { themeStretch } = useSettingsContext()

    const { translate } = useLocales()

    const [getStatistics, { data, loading, error }] = useLazyGetStatistics(true)

    useEffect(() => {
        getStatistics()
    }, [getStatistics])

    const summaryDataResponse = data?.getStatistics.summaryData
    const strainSummaryData = data?.getStatistics.summaryStrain || []
    const seriesData = data?.getStatistics.seriesData || []

    const summaryData: ISummaryData[] = [
        {
            title: `${translate('dashboard.statistics.strain')}`,
            total: summaryDataResponse?.strain.total || 0,
            icon: 'uil:dna',
            color: 'secondary',
        },
        {
            title: `${translate('dashboard.statistics.phage')}`,
            total: summaryDataResponse?.phage.total || 0,
            icon: 'game-icons:virus',
            color: 'warning',
        },
        {
            title: `${translate('dashboard.statistics.spacer')}`,
            total: summaryDataResponse?.crisprArray.total || 0,
            icon: 'lucide:dna',
            color: 'primary',
        },
        {
            title: `${translate('dashboard.statistics.accessionNumber')}`,
            total: summaryDataResponse?.accessionNumber.total || 0,
            icon: 'game-icons:dna2',
            color: 'error',
        },
    ]

    const BREAD_CRUMBS = [
        {
            name: 'Dashboard',
            href: PATH_DASHBOARD.root,
        },
        {
            name: 'System',
            href: PATH_DASHBOARD.system.statistics,
        },
        {
            name: 'Statistics',
        },
    ]
    if (loading) {
        return <LoadingScreen />
    }
    if (error) {
        return <Page500 />
    }
    return (
        <>
            <Head>
                <title>{`${translate('dashboard.statistics.title')}`} </title>
            </Head>

            <Container maxWidth={themeStretch ? false : 'xl'}>
                <CustomBreadcrumbs
                    heading={`${translate('dashboard.statistics.title')}`}
                    links={BREAD_CRUMBS}
                />
                <Grid container spacing={3} alignItems="center">
                    <SystemSummary arraySummaryData={summaryData} />
                    <StrainSummary strainSummaryData={strainSummaryData} />
                    <AnalyticsTypes seriesData={seriesData} />
                   <PhagePieChart />
                </Grid>
            </Container>
        </>
    )
}
