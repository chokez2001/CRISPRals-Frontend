import { m } from 'framer-motion'
// @mui
import { alpha, styled } from '@mui/material/styles'
import { Box, Card, Container, Typography, Stack } from '@mui/material'
// components
import Image from '../../components/image'
import { MotionViewport, varFade } from '../../components/animate'
import { useLocales } from '../../locales'
import Iconify from '../../components/iconify'

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
    padding: theme.spacing(10, 0),
    [theme.breakpoints.up('md')]: {
        padding: theme.spacing(15, 0),
    },
}))

const StyledCard = styled(Card)(({ theme }) => ({
    backgroundColor: theme.palette.background.default,
    textAlign: 'center',
    padding: theme.spacing(10, 5),
    [theme.breakpoints.up('md')]: {
        boxShadow: 'none',
    },
}))

// ----------------------------------------------------------------------

export default function HomeMinimal() {
    const { translate } = useLocales()
    const CARDS = [
        {
            icon: 'material-symbols:verified-rounded',
            title: `${translate('home.whatFound.cardOne.title')}`,
            description: (
                <>
                    {translate('home.whatFound.cardOne.description1')}
                    <em>Ralstonia solanacearum </em>
                    {translate('home.whatFound.cardOne.description2')}
                </>
            ),
        },
        {
            icon: 'icon-park-outline:code-computer',
            title: `${translate('home.whatFound.cardTwo.title')}`,
            description: `${translate('home.whatFound.cardTwo.description')}`,
        },
        {
            icon: 'file-icons:telegram',
            title: `${translate('home.whatFound.cardThree.title')}`,
            description: (
                <>
                    {translate('home.whatFound.cardThree.description1')}
                    <em> Ralstonia </em>
                    {translate('home.whatFound.cardThree.description2')}
                </>    
            )
        },
    ]
    return (
        <StyledRoot id="about-system">
            <Container component={MotionViewport}>
                <Stack
                    spacing={3}
                    sx={{
                        textAlign: 'center',
                        mb: { xs: 5, md: 10 },
                    }}
                >
                    <m.div variants={varFade().inDown}>
                        <Stack
                            direction="row"
                            spacing={2}
                            justifyContent="center"
                            alignItems="center"
                        >
                            <Typography variant="h2">{`${translate(
                                'home.whatFound.title'
                            )}`}</Typography>
                            <Typography variant="h2" color="primary">
                                CRISPRals
                            </Typography>
                            <Typography variant="h2">?</Typography>
                        </Stack>
                    </m.div>
                </Stack>

                <Box
                    gap={{ xs: 3, lg: 10 }}
                    display="grid"
                    alignItems={{ xs: 'center', md: 'flex-start' }}
                    gridTemplateColumns={{
                        xs: 'repeat(1, 1fr)',
                        md: 'repeat(3, 1fr)',
                    }}
                >
                    {CARDS.map((card, index) => (
                        <StyledCard
                            key={card.title}
                            sx={{
                                ...(index === 1 && {
                                    boxShadow: (theme) => ({
                                        md: `-40px 40px 80px ${
                                            theme.palette.mode === 'light'
                                                ? alpha(
                                                      theme.palette.grey[500],
                                                      0.16
                                                  )
                                                : alpha(
                                                      theme.palette.common
                                                          .black,
                                                      0.4
                                                  )
                                        }`,
                                    }),
                                }),
                            }}
                        >
                            <Iconify
                                icon={card.icon}
                                width={48}
                                color={(theme) => theme.palette.primary.main}
                            />

                            <Typography variant="h5" sx={{ mt: 8, mb: 2 }}>
                                {card.title}
                            </Typography>

                            <Typography sx={{ color: 'text.secondary' }}>
                                {card.description}
                            </Typography>
                        </StyledCard>
                    ))}
                </Box>
            </Container>
        </StyledRoot>
    )
}
