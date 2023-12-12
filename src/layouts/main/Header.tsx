import { useTheme } from '@mui/material/styles'
import { Box, AppBar, Toolbar, Container, BoxProps } from '@mui/material'
import useOffSetTop from '../../hooks/useOffSetTop'
import useResponsive from '../../hooks/useResponsive'
import { bgBlur } from '../../utils/cssStyles'
import { HEADER } from '../../config-global'
import Logo from '../../components/logo'
import NavMobile from './nav/mobile'
import navConfig from './nav/config-navigation'
import NavDesktop from './nav/desktop'
import LanguagePopover from '../dashboard/header/LanguagePopover'

export default function Header() {
    const theme = useTheme()

    const isDesktop = useResponsive('up', 'md')

    const isOffset = useOffSetTop(HEADER.H_MAIN_DESKTOP)

    return (
        <AppBar color="transparent" sx={{ boxShadow: 0 }}>
            <Toolbar
                disableGutters
                sx={{
                    height: {
                        xs: HEADER.H_MOBILE,
                        md: HEADER.H_MAIN_DESKTOP,
                    },
                    transition: theme.transitions.create(
                        ['height', 'background-color'],
                        {
                            easing: theme.transitions.easing.easeInOut,
                            duration: theme.transitions.duration.shorter,
                        }
                    ),
                    ...(isOffset && {
                        ...bgBlur({ color: theme.palette.background.default }),
                        height: {
                            md: HEADER.H_MAIN_DESKTOP - 16,
                        },
                    }),
                }}
            >
                <Container
                    sx={{ height: 1, display: 'flex', alignItems: 'center' }}
                >
                    <Logo disabledLink />
                    <LanguagePopover />

                    <Box sx={{ flexGrow: 1 }} />

                    {isDesktop && (
                        <NavDesktop isOffset={isOffset} data={navConfig} />
                    )}

                    {!isDesktop && (
                        <NavMobile isOffset={isOffset} data={navConfig} />
                    )}
                </Container>
            </Toolbar>

            {isOffset && <Shadow />}
        </AppBar>
    )
}

// ----------------------------------------------------------------------

function Shadow({ sx, ...other }: BoxProps) {
    return (
        <Box
            sx={{
                left: 0,
                right: 0,
                bottom: 0,
                height: 24,
                zIndex: -1,
                m: 'auto',
                borderRadius: '50%',
                position: 'absolute',
                width: `calc(100% - 48px)`,
                boxShadow: (theme) => theme.customShadows.z8,
                ...sx,
            }}
            {...other}
        />
    )
}
