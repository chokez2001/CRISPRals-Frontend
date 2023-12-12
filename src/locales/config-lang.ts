import { enUS, esES } from '@mui/material/locale'

export const allLangs = [
    {
        label: 'English',
        value: 'en',
        systemValue: enUS,
        icon: '/assets/icons/flags/ic_flag_en.svg',
    },
    {
        label: 'Español',
        value: 'es',
        systemValue: esES,
        icon: '/assets/icons/flags/ic_flag_es.svg',
    },
]

export const defaultLang = allLangs[0]
