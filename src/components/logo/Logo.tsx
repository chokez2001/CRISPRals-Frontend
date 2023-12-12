import { forwardRef } from 'react'
import NextLink from 'next/link'
import { Box, Link, BoxProps } from '@mui/material'

export interface LogoProps extends BoxProps {
    disabledLink?: boolean
}

const Logo = forwardRef<HTMLDivElement, LogoProps>(
    ({ disabledLink = false, sx, ...other }, ref) => {
        const logo = (
            <Box
                component="img"
                src="/assets/logo.svg"
                sx={{ width: 40, height: 40, cursor: 'pointer', ...sx }}
            />
        )

        if (disabledLink) {
            return logo
        }

        return (
            <Link component={NextLink} href="/" sx={{ display: 'contents' }}>
                {logo}
            </Link>
        )
    }
)

export default Logo
