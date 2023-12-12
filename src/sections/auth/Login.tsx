import { Stack, Typography, Link } from '@mui/material'
import LoginLayout from '../../layouts/login'
import { useLocales } from '../../locales'
import { PATH_EXTERNAL } from '../../routes/paths'
import AuthWithSocial from './AuthWithSocial'

export default function Login() {
    const { translate } = useLocales()

    return (
        <LoginLayout
            illustration="/assets/logo.svg"
            title={`${translate('auth.welcome')}`}
        >
            <Stack spacing={2} sx={{ mb: 5, position: 'relative' }}>
                <Stack direction="row" spacing={0.5}>
                    <Typography variant="h4">{`${translate(
                        'auth.singIn'
                    )}`}</Typography>
                    <Typography variant="h4" color="primary">
                        CRISPRals
                    </Typography>
                </Stack>
                <Stack direction="row" spacing={0.5}>
                    <Typography variant="body2">{`${translate(
                        'auth.new'
                    )}`}</Typography>
                    <Link
                        variant="subtitle2"
                        href={PATH_EXTERNAL.createGOOGLEAccount}
                        target="_blank"
                    >
                        Create an account
                    </Link>
                </Stack>
            </Stack>
            <AuthWithSocial />
        </LoginLayout>
    )
}
