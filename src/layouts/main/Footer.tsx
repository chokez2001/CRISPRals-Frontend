// next
import NextLink from 'next/link'
import { useRouter } from 'next/router'
// @mui
import {
    Box,
    Grid,
    Link,
    Stack,
    Divider,
    Container,
    Typography,
    IconButton,
} from '@mui/material'
// routes
import { PATH_PAGE } from '../../routes/paths'
// _mock
import { _socials } from '../../_mock/arrays'
// components
import Logo from '../../components/logo'
import Iconify from '../../components/iconify'
import { useLocales } from '../../locales'
import terms_anconditions from '../../pages/terms_and_conditions'
import privacy from '../../pages/privacy'
import { Padding } from '@mui/icons-material'


// ----------------------------------------------------------------------

const LINKS = [
    {
        headline: 'Information',
        children: [
            { name: 'About us', href: PATH_PAGE.about },
            { name: 'Contact us', href: PATH_PAGE.contact },
        ],
    },
    {
        headline: 'Log in',
        children: [{ name: 'By Google', href: '#' }],
    },
    {
        headline: 'Contact',
        children: [
            { name: 'crisprals.yachay@gmail.com', href: 'mailto:crisprals.yachay@gmail.com' },
            {
                name: 'Hacienda San José, Urcuqui, Ecuador',
                href: '#contact-us',
            },
        ],
    },
    {
        headline: 'Legal',
        children: [
            { name: 'Terms and Conditions', href: PATH_PAGE.termsConditions},
            { name: 'Privacy policy', href: PATH_PAGE.privacyPolicy},
        ],
    },
]

// ----------------------------------------------------------------------

export default function Footer() {
    const { pathname } = useRouter()
    const currentYear = new Date().getFullYear()
    const { translate } = useLocales()

    const isHome = pathname === '/'

    const simpleFooter = (
        <Box
            component="footer"
            sx={{
                py: 5,
                textAlign: 'center',
                position: 'relative',
                bgcolor: 'background.default',
            }}
        >
            <Container>
                <Logo sx={{ mb: 1, mx: 'auto' }} />

                <Typography variant="caption" component="div">
                    © All rights reserved
                    <br /> made by &nbsp;
                    <Link href="https://minimals.cc/"> minimals.cc </Link>
                </Typography>
            </Container>
        </Box>
    )

    const mainFooter = (
        <Box
            component="footer"
            sx={{
                position: 'relative',
                bgcolor: 'background.default',
            }}
        >
            <Divider />

            <Container sx={{ pt: 10 }}>
                <Grid
                    container
                    justifyContent={{
                        xs: 'center',
                        md: 'space-between',
                    }}
                    sx={{
                        textAlign: {
                            xs: 'center',
                            md: 'left',
                        },
                    }}
                >
                    <Grid item xs={12} sx={{ mb: 3 }}>
                        <Logo sx={{ mx: { xs: 'auto', md: 'inherit' } }} />
                    </Grid>

                    <Grid item xs={8} md={3}>
                        <Typography variant="body2" sx={{ pr: { md: 5 } }}>
                            {`${translate('home.slogan')}`}
                            <em> Ralstonia solanacearum </em>
                            Species Complex.
                        </Typography>

                        <Stack
                            spacing={1}
                            direction="row"
                            justifyContent={{ xs: 'center', md: 'flex-start' }}
                            sx={{
                                mt: 5,
                                mb: { xs: 5, md: 0 },
                            }}
                        >
                            {_socials.map((social) => (
                                <IconButton key={social.name}>
                                    <Iconify icon={social.icon} />
                                </IconButton>
                            ))}
                        </Stack>
                    </Grid>

                    <Grid item xs={12} md={7}>
                        <Stack
                            spacing={5}
                            justifyContent="space-between"
                            direction={{ xs: 'column', md: 'row' }}
                        >
                            {LINKS.map((list) => (
                                <Stack
                                    key={list.headline}
                                    spacing={2}
                                    alignItems={{
                                        xs: 'center',
                                        md: 'flex-start',
                                    }}
                                >
                                    <Typography
                                        component="div"
                                        variant="overline"
                                    >
                                        {list.headline}
                                    </Typography>

                                    {list.children.map((link) => (
                                        <Link
                                            key={link.name}
                                            component={NextLink}
                                            href={link.href}
                                            color="inherit"
                                            variant="body2"
                                        >
                                            {link.name}
                                        </Link>
                                    ))}
                                </Stack>
                            ))}
                        </Stack>
                    </Grid>
                </Grid>

                <Typography
                    variant="caption"
                    component="div"
                    sx={{
                        mt: 10,
                        pb: 5,
                        textAlign: { xs: 'center', md: 'left' },
                    }}
                >
                    © {currentYear}. All rights reserved
                </Typography>
            </Container>
        </Box>
    )

    return isHome ? mainFooter : simpleFooter
}
