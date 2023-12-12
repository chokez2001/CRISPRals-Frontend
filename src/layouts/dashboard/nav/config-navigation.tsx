// routes
import { PATH_DASHBOARD, PATH_EXTERNAL } from '../../../routes/paths'
// components
import Iconify from '../../../components/iconify'

// ----------------------------------------------------------------------

const icon = (name: string) => <Iconify icon={name} />

const ICONS = {
    statistics: icon('fluent:data-pie-20-regular'),
    database: icon('eos-icons:data-mining'),
    laboratory: icon('material-symbols:lab-research-outline-sharp'),
    externalLink: icon('dashicons:admin-links'),
}

const navConfig = [
    // GENERAL
    // ----------------------------------------------------------------------
    {
        subheader: 'System',
        items: [
            {
                title: 'Statistics',
                path: PATH_DASHBOARD.system.statistics,
                icon: ICONS.statistics,
            },
            {
                title: 'Database',
                path: PATH_DASHBOARD.system.database,
                icon: ICONS.database,
            },
            {
                title: 'tools',
                path: PATH_DASHBOARD.system.tools,
                icon: ICONS.laboratory,
            },
        ],
    },

    // MANAGEMENT
    // ----------------------------------------------------------------------
    {
        subheader: 'resources',
        items: [
            {
                title: 'External links',
                path: PATH_DASHBOARD.external,
                icon: ICONS.externalLink,
                children: [
                    {
                        title: 'NCBI',
                        path: PATH_EXTERNAL.NCBI,
                        isExternalLink: true,
                    },
                    {
                        title: 'CRISPRCasFinder',
                        path: PATH_EXTERNAL.CRISPRCasFinder,
                        isExternalLink: true,
                    },
                    {
                        title: 'CRISPRTarget',
                        path: PATH_EXTERNAL.CRISPRTarget,
                        isExternalLink: true,
                    },
                    {
                        title: 'CRISPRDetect',
                        path: PATH_EXTERNAL.CRISPRDetect,
                        isExternalLink: true,
                    },
                ],
            },
        ],
    },
]

export default navConfig
