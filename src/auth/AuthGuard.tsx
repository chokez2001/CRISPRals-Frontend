import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Login from '../pages/auth/login'
import { useAuthContext } from './useAuthContext'
import ClientOnly from '../components/client-only/ClientOnly'

type AuthGuardProps = {
    children: React.ReactNode
}

export default function AuthGuard({ children }: AuthGuardProps) {
    const { user } = useAuthContext()

    const { pathname, push } = useRouter()

    const [requestedLocation, setRequestedLocation] = useState<string | null>(
        null
    )

    useEffect(() => {
        if (requestedLocation && pathname !== requestedLocation) {
            push(requestedLocation)
        }
        if (user) {
            setRequestedLocation(null)
        }
    }, [user, pathname, push, requestedLocation])

    if (!user) {
        if (pathname !== requestedLocation) {
            setRequestedLocation(pathname)
        }
        return <Login />
    }

    return <ClientOnly> {children} </ClientOnly>
}
