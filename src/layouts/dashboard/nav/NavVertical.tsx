import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Box, Stack, Drawer } from '@mui/material'
import useResponsive from '../../../hooks/useResponsive'
import { NAV } from '../../../config-global'
import Logo from '../../../components/logo'
import Scrollbar from '../../../components/scrollbar'
import { NavSectionVertical } from '../../../components/nav-section'
import navConfig from './config-navigation'
import NavAccount from './NavAccount'
import NavToggleButton from './NavToggleButton'

type Props = {
    openNav: boolean
    onCloseNav: VoidFunction
}

export default function NavVertical({ openNav, onCloseNav }: Props) {
    const { pathname } = useRouter()

    const [showToggleButton, setShowToggleButton] = useState<boolean>()

    const isDesktop = useResponsive('up', 'lg')

    useEffect(() => {
        if (openNav) {
            onCloseNav()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname])

    const renderContent = (
        <Scrollbar
            sx={{
                height: 1,
                '& .simplebar-content': {
                    height: 1,
                    display: 'flex',
                    flexDirection: 'column',
                },
            }}
        >
            <Stack
                spacing={3}
                sx={{
                    pt: 3,
                    pb: 2,
                    px: 2.5,
                    flexShrink: 0,
                }}
            >
                <Logo />

                <NavAccount />
            </Stack>

            <NavSectionVertical data={navConfig} />

            <Box sx={{ flexGrow: 1 }} />
        </Scrollbar>
    )

    return (
        <Box
            component="nav"
            sx={{
                flexShrink: { lg: 0 },
                width: { lg: NAV.W_DASHBOARD },
                backgroundColor: (theme) => theme.palette.background.neutral,
            }}
            onMouseEnter={() => {
                setShowToggleButton(true)
            }}
            onMouseLeave={() => {
                setShowToggleButton(false)
            }}
        >
            {showToggleButton && <NavToggleButton />}

            {isDesktop ? (
                <Drawer
                    open
                    variant="permanent"
                    PaperProps={{
                        sx: {
                            zIndex: 0,
                            width: NAV.W_DASHBOARD,
                            bgcolor: 'transparent',
                            borderRightStyle: 'dashed',
                        },
                    }}
                >
                    {renderContent}
                </Drawer>
            ) : (
                <Drawer
                    open={openNav}
                    onClose={onCloseNav}
                    ModalProps={{
                        keepMounted: true,
                    }}
                    PaperProps={{
                        sx: {
                            width: NAV.W_DASHBOARD,
                        },
                    }}
                >
                    {renderContent}
                </Drawer>
            )}
        </Box>
    )
}
