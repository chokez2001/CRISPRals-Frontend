import { IconButton, IconButtonProps } from '@mui/material'
import useResponsive from '../../../hooks/useResponsive'
import { NAV } from '../../../config-global'
import Iconify from '../../../components/iconify'
import { useSettingsContext } from '../../../components/settings'

export default function NavToggleButton({ sx, ...other }: IconButtonProps) {
    const { themeLayout, onToggleLayout } = useSettingsContext()

    const isDesktop = useResponsive('up', 'lg')

    if (!isDesktop) {
        return null
    }

    return (
        <IconButton
            size="small"
            onClick={onToggleLayout}
            sx={{
                p: 0.5,
                top: 18,
                width: 30,
                height: 30,
                position: 'fixed',
                left: NAV.W_DASHBOARD - 12,
                bgcolor: 'background.default',
                zIndex: (theme) => theme.zIndex.appBar + 1,
                border: (theme) => `dashed 1px ${theme.palette.divider}`,
                boxShadow: (theme) => theme.customShadows.primary,
                '&:hover': {
                    bgcolor: 'background.default',
                },
                ...sx,
            }}
            {...other}
        >
            <Iconify
                width={20}
                icon={
                    themeLayout === 'vertical'
                        ? 'material-symbols:arrow-back'
                        : 'material-symbols:arrow-forward'
                }
                color="primary.main"
            />
        </IconButton>
    )
}
