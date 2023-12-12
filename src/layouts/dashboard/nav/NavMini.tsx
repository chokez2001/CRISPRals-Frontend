import { Stack, Box } from '@mui/material'
import { useState } from 'react'
import { NAV } from '../../../config-global'
import { hideScrollbarX } from '../../../utils/cssStyles'
import Logo from '../../../components/logo'
import { NavSectionMini } from '../../../components/nav-section'
import navConfig from './config-navigation'
import NavToggleButton from './NavToggleButton'

export default function NavMini() {
    const [showToggleButton, setShowToggleButton] = useState<boolean>()

    return (
        <Box
            component="nav"
            sx={{
                flexShrink: { lg: 0 },
                width: { lg: NAV.W_DASHBOARD_MINI },
                backgroundColor: (theme) => theme.palette.background.neutral,
            }}
            onMouseEnter={() => {
                setShowToggleButton(true)
            }}
            onMouseLeave={() => {
                setShowToggleButton(false)
            }}
        >
            {showToggleButton && (
                <NavToggleButton
                    sx={{
                        left: NAV.W_DASHBOARD_MINI - 12,
                    }}
                />
            )}

            <Stack
                sx={{
                    pb: 2,
                    height: 1,
                    position: 'fixed',
                    width: NAV.W_DASHBOARD_MINI,
                    borderRight: (theme) =>
                        `dashed 1px ${theme.palette.divider}`,
                    ...hideScrollbarX,
                }}
            >
                <Logo sx={{ mx: 'auto', my: 2 }} />

                <NavSectionMini data={navConfig} />
            </Stack>
        </Box>
    )
}
