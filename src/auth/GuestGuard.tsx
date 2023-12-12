import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useAuthContext } from './useAuthContext'
import { PATH_DASHBOARD } from '../routes/paths'

type GuestGuardProps = {
    children: React.ReactNode
}

export default function GuestGuard({ children }: GuestGuardProps) {
    const { push } = useRouter()

    const { user } = useAuthContext()

    useEffect(() => {
        if (user) {
            push(PATH_DASHBOARD.root)
        }
    }, [user, push])

    return <> {children} </>
}
