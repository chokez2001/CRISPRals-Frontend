import { Button, Stack, Typography } from '@mui/material'
import { useAuthContext } from '../../auth/useAuthContext'
import Image from '../../components/image'

export default function AuthWithSocial() {
    const { loginWithGoogle } = useAuthContext()

    const handleGoogleLogin = async () => {
        try {
            if (loginWithGoogle) {
                loginWithGoogle()
            }
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <Stack direction="row" justifyContent="center" spacing={2}>
            <Button
                onClick={() => handleGoogleLogin()}
                size="large"
                variant="outlined"
                startIcon={
                    <Image
                        disabledEffect
                        alt="/assets/icons/auth/googleLogo.svg"
                        src="/assets/icons/auth/googleLogo.svg"
                        sx={{ width: 28, mr: 2 }}
                    />
                }
            >
                <Typography>Google</Typography>
            </Button>
        </Stack>
    )
}
