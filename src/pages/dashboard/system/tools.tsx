import Head from 'next/head'
import { Container, Typography } from '@mui/material'
import DashboardLayout from '../../../layouts/dashboard'
import { useSettingsContext } from '../../../components/settings'
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs'
import { useLocales } from '../../../locales'
import { PATH_DASHBOARD } from '../../../routes/paths'
import UploadFasta from '../../../sections/dashboard/system/UploadFasta'

PageFive.getLayout = (page: React.ReactElement) => (
    <DashboardLayout>{page}</DashboardLayout>
)

export default function PageFive() {
    const { themeStretch } = useSettingsContext()
    const { translate } = useLocales()
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
            name: 'Tools',
        },
    ]

    return (
        <>
            <Head>
                <title> Tools </title>
            </Head>

            <Container maxWidth={themeStretch ? false : 'xl'}>
                <CustomBreadcrumbs
                    heading={`${translate('dashboard.tools.title')}`}
                    links={BREAD_CRUMBS}
                />
                <UploadFasta />
            </Container>
        </>
    )
}
