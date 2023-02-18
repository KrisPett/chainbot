declare namespace NodeJS {
  interface ProcessEnv {
    NEXTAUTH_URL:string
    NEXTAUTH_SECRET:string
    KEYCLOAK_ID: string
    KEYCLOAK_SECRET: string
    KEYCLOAK_ISSUER: string
  }
}
