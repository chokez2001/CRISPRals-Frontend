import { m } from 'framer-motion'
import { useRef } from 'react'
// @mui
import { useTheme } from '@mui/material/styles'
import { Box, Card, Container, Typography } from '@mui/material'
// components
import Image from '../../components/image'
import Carousel, { CarouselArrows } from '../../components/carousel'
import { MotionViewport, varFade } from '../../components/animate'
import { useLocales } from '../../locales'
import { MEMBERS } from '../../constants/members'

// ----------------------------------------------------------------------

export default function AboutTeam() {
    const { translate } = useLocales()

    const carouselRef = useRef<Carousel>(null)

    const theme = useTheme()

    const carouselSettings = {
        slidesToScroll: 1,
        autoplay: true,
        speed: 2000,
        autoplaySpeed: 2000,
        cssEase: 'linear',
        infinite: true,
        arrows: false,
        slidesToShow: 4,
        rtl: Boolean(theme.direction === 'rtl'),
        responsive: [
            {
                breakpoint: 1279,
                settings: { slidesToShow: 3 },
            },
            {
                breakpoint: 959,
                settings: { slidesToShow: 2 },
            },
            {
                breakpoint: 600,
                settings: { slidesToShow: 1 },
            },
        ],
    }

    const handlePrev = () => {
        carouselRef.current?.slickPrev()
    }

    const handleNext = () => {
        carouselRef.current?.slickNext()
    }

    return (
        <Container
            id="about-us"
            component={MotionViewport}
            sx={{ pb: 10, textAlign: 'center' }}
        >
            <m.div variants={varFade().inUp}>
                <Typography color="primary" variant="h2" sx={{ my: 3 }}>
                    {`${translate('home.aboutUs.title')}`}
                </Typography>
            </m.div>

            <m.div variants={varFade().inUp}>
                <Typography
                    sx={{
                        mx: 'auto',
                        color: 'text.secondary',
                    }}
                >
                    {`${translate('home.aboutUs.description1')}`}
                    <em> Ralstonia solanacearum </em>
                    {`${translate('home.aboutUs.description2')}`}
                </Typography>
            </m.div>

            <Box sx={{ position: 'relative' }}>
                <CarouselArrows
                    filled
                    shape="circular"
                    onNext={handleNext}
                    onPrevious={handlePrev}
                    leftButtonProps={{
                        sx: {
                            left: 24,
                            ...(MEMBERS.length < 5 && { display: 'none' }),
                        },
                    }}
                    rightButtonProps={{
                        sx: {
                            right: 24,
                            ...(MEMBERS.length < 5 && { display: 'none' }),
                        },
                    }}
                >
                    <Carousel ref={carouselRef} {...carouselSettings}>
                        {MEMBERS.map((member) => (
                            <Box
                                key={member.id}
                                component={m.div}
                                variants={varFade().in}
                                sx={{ px: 1.5, py: 10 }}
                            >
                                <MemberCard member={member} />
                            </Box>
                        ))}
                    </Carousel>
                </CarouselArrows>
            </Box>
        </Container>
    )
}

// ----------------------------------------------------------------------

type MemberCardProps = {
    member: {
        name: string
        role: string | undefined
        avatar: string
    }
}

function MemberCard({ member }: MemberCardProps) {
    const { name, role, avatar } = member
    return (
        <Card key={name}>
            <Typography variant="subtitle1" sx={{ mt: 2, mb: 0.5 }}>
                {name}
            </Typography>

            <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
                {role}
            </Typography>

            <Box sx={{ px: 1 }}>
                <Image
                    alt={name}
                    src={avatar}
                    ratio="3/4"
                    sx={{ borderRadius: 2 }}
                />
            </Box>
        </Card>
    )
}
