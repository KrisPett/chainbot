declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_CLIENT_URL: string
    NEXT_PUBLIC_AWS_GATEWAY_URL: string
    NEXTAUTH_URL: string
    NEXTAUTH_SECRET: string
    KEYCLOAK_ID: string
    KEYCLOAK_SECRET: string
    KEYCLOAK_ISSUER: string
  }
}
