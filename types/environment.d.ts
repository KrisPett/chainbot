declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_NEXTAUTH_URL: string
    NEXTAUTH_SECRET: string
    KEYCLOAK_ID: string
    KEYCLOAK_SECRET: string
    KEYCLOAK_ISSUER: string
  }
}
