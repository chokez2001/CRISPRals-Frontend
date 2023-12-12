import { m } from 'framer-motion'
// @mui
import { Card, Container, Stack, Typography } from '@mui/material'
// components
import { MotionViewport, varFade } from '../../components/animate'
import { useLocales } from '../../locales'
import { MAP_URL } from '../../constants/common'

// ----------------------------------------------------------------------

export default function ContactUs() {
    const { translate } = useLocales()

    return (
        <Container
            id="contact-us"
            component={MotionViewport}
            sx={{ pb: 10, textAlign: 'center' }}
        >
            <m.div variants={varFade().inDown}>
                <Stack
                    direction="row"
                    spacing={1}
                    justifyContent="center"
                    alignItems="center"
                >
                    <Typography color="primary" variant="h2" sx={{ my: 3 }}>
                        {`${translate('home.contactUs.where')}`}
                    </Typography>
                    <Typography variant="h2" sx={{ my: 3 }}>
                        {`${translate('home.contactUs.findUs')}`}
                    </Typography>
                </Stack>
            </m.div>
            <m.div variants={varFade().inDown}>
                <Typography
                    sx={{
                        mx: 'auto',
                        color: 'text.secondary',
                    }}
                >
                    {`${translate('home.contactUs.description')}`}
                </Typography>
            </m.div>
            <m.div variants={varFade().inDown}>
                <Card
                    raised
                    sx={{
                        boxShadow: (theme) => theme.customShadows.z16,
                        padding: 2,
                        mt: 5,
                    }}
                >
                    <iframe
                        title="map"
                        src={MAP_URL}
                        width="100%"
                        height="450"
                        style={{ border: 0, borderRadius: 5 }}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    />
                </Card>
            </m.div>
        </Container>
    )
}
