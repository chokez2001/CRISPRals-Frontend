// routes
import { PATH_PAGE } from '../../../routes/paths'
// config
// components
import Iconify from '../../../components/iconify'

// ----------------------------------------------------------------------

const navConfig = [
    {
        title: 'Home',
        icon: <Iconify icon="eva:home-fill" />,
        path: PATH_PAGE.home,
    },
    {
        title: 'About system',
        icon: <Iconify icon="ic:round-grain" />,
        path: PATH_PAGE.aboutSystem,
    },
    {
        title: 'About us',
        icon: <Iconify icon="ic:round-grain" />,
        path: PATH_PAGE.about,
    },
    {
        title: 'Contact',
        icon: <Iconify icon="ic:round-grain" />,
        path: PATH_PAGE.contact,
    },
]

export default navConfig
