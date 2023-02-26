import NextAuth, {DefaultSession} from "next-auth"

declare module "next-auth/jwt" {
  interface JWT {
    access_token?: string
    refresh_token?: string
    id_token?: string
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
    access_token?: string
    refresh_token?: string
    id_token?: string
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
