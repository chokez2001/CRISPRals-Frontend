import Head from 'next/head'
import { Container } from '@mui/material'
import DashboardLayout from '../../../layouts/dashboard'
import { useSettingsContext } from '../../../components/settings'
import { PATH_DASHBOARD } from '../../../routes/paths'
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs'
import { useLocales } from '../../../locales'
import {
    CrisprDialog,
    DatabaseAnalytic,
    DatabaseTable,
} from '../../../sections/dashboard/system/intex'
import { useLazyGetStatistics } from '../../../GraphQl/Queries/getStatistics'
import { useEffect } from 'react'
import LoadingScreen from '../../../components/loading-screen'
import Page500 from '../../../components/errors/505'

PageFive.getLayout = (page: React.ReactElement) => (
    <DashboardLayout>{page}</DashboardLayout>
)

export default function PageFive() {
    const { themeStretch } = useSettingsContext()

    const { translate } = useLocales()          

    const [getStatistics, { data, loading, error }] = useLazyGetStatistics(true)

    const seriesData = data?.getStatistics.seriesData || []

    useEffect(() => {
        getStatistics()
    }, [getStatistics])

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
            name: `${translate('dashboard.database.title')}`,
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
                <title> Database </title>
            </Head>

            <Container maxWidth={themeStretch ? false : 'xl'}>
                <CustomBreadcrumbs
                    heading={`${translate('dashboard.database.title')}`}
                    links={BREAD_CRUMBS}
                />
                <DatabaseAnalytic speciesSeries={seriesData} />
                <DatabaseTable speciesSeries={seriesData} />
                <CrisprDialog />
            </Container>
        </>
    )
}
