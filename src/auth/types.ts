export type AuthUserType =
    | null
    | {
          name?: string | null
          email?: string | null
          image?: string | null
          role?: string | null
      }
    | undefined

export type SocialContextType = {
    user: AuthUserType
    logout: () => void
    loginWithGoogle?: () => void
}
