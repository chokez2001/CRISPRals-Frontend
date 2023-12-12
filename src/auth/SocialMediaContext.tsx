import { createContext, useMemo } from 'react'
import { signIn, useSession, signOut } from 'next-auth/react'
import { SocialContextType } from './types'
import { PATH_DASHBOARD } from '../routes/paths'

export const AuthContext = createContext<SocialContextType | null>(null)

type AuthProviderProps = {
    children: React.ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
    const { data: session } = useSession()
    const memoizedValue = useMemo(
        () => ({
            user: session?.user,
            loginWithGoogle: () =>
                signIn('google', { callbackUrl: PATH_DASHBOARD.root }),
            logout: signOut,
        }),
        [session]
    )

    return (
        <AuthContext.Provider value={memoizedValue}>
            {children}
        </AuthContext.Provider>
    )
}
