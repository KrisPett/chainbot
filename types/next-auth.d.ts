import NextAuth, {DefaultSession} from "next-auth"

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string
    refreshToken?: string
    idToken?: string
    providerAccountId?: string
    scope?: string
    session_state?: string
    token_type?: string
    type?: string
    userId?: string
    expires_at?: number
    error?: string
  }
}

declare module "next-auth" {
  interface Session {
    user: {
      address: string
    }
    accessToken?: string
    refreshToken?: string
    idToken?: string
    providerAccountId?: string
    scope?: string
    session_state?: string
    token_type?: string
    type?: string
    userId?: string
    expires_at?: number
    error?: string
  }
}
