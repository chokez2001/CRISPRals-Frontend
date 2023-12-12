// @mui
import { useTheme } from '@mui/material/styles'
import { GlobalStyles } from '@mui/material'
import useResponsive from '../../hooks/useResponsive'

// ----------------------------------------------------------------------

export default function StyledNotistack() {
    const theme = useTheme()

    const isLight = theme.palette.mode === 'light'
    const isDesktop = useResponsive('up', 'lg')

    const inputGlobalStyles = (
        <GlobalStyles
            styles={{
                '#__next': {
                    '.SnackbarContent-root': {
                        width: isDesktop ? 960 : '100%',
                        padding: theme.spacing(1),
                        margin: theme.spacing(0.25, 0),
                        boxShadow: theme.customShadows.z8,
                        borderRadius: theme.shape.borderRadius,
                        color: isLight
                            ? theme.palette.common.white
                            : theme.palette.grey[800],
                        backgroundColor: isLight
                            ? theme.palette.grey[900]
                            : theme.palette.common.white,
                        '&.SnackbarItem-variantSuccess': {
                            color: theme.palette.success.contrastText,
                            backgroundColor: theme.palette.success.main,
                        },
                        '&.SnackbarItem-variantError': {
                            color: theme.palette.error.contrastText,
                            backgroundColor: theme.palette.error.main,
                        },
                        '&.SnackbarItem-variantWarning, &.SnackbarItem-variantInfo':
                            {
                                color: theme.palette.text.primary,
                                backgroundColor:
                                    theme.palette.background.default,
                            },
                        [theme.breakpoints.up('md')]: {
                            minWidth: 240,
                        },
                    },
                    '.SnackbarItem-message': {
                        padding: '0 !important',
                        fontWeight: theme.typography.fontWeightMedium,
                    },
                    '.SnackbarItem-action': {
                        marginRight: 0,
                        color: theme.palette.action.active,

                        '& svg': {
                            width: 20,
                            height: 20,
                        },
                    },
                },
            }}
        />
    )

    return inputGlobalStyles
}
