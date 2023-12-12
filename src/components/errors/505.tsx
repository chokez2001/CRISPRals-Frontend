import { m } from 'framer-motion'
import Head from 'next/head'
import NextLink from 'next/link'
import { Button, Stack, Typography } from '@mui/material'
import { MotionContainer, varBounce } from '../animate'
import { SeverErrorIllustration } from '../../assets/illustrations'

export default function Page500() {
    return (
        <>
            <Head>
                <title> 500 Internal Server Error</title>
            </Head>
            <MotionContainer>
                <Stack alignItems="center">
                    <m.div variants={varBounce().in}>
                        <Typography variant="h3" paragraph>
                            500 Internal Server Error
                        </Typography>
                    </m.div>
                    <m.div variants={varBounce().in}>
                        <Typography sx={{ color: 'text.secondary' }}>
                            There was an error, please try again later.
                        </Typography>
                    </m.div>
                    <m.div variants={varBounce().in}>
                        <SeverErrorIllustration
                            sx={{ height: 260, my: { xs: 5, sm: 10 } }}
                        />
                    </m.div>
                    <Button
                        component={NextLink}
                        href="/"
                        size="large"
                        variant="contained"
                    >
                        Go to Home
                    </Button>
                </Stack>
            </MotionContainer>
        </>
    )
}
