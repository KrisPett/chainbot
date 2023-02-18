import KeycloakProvider from "next-auth/providers/keycloak";
import NextAuth, {Session} from "next-auth";
import {JWT} from "next-auth/jwt";

const keycloak = KeycloakProvider({
  clientId: process.env.KEYCLOAK_ID,
  clientSecret: process.env.KEYCLOAK_SECRET,
  issuer:  process.env.KEYCLOAK_ISSUER,
});

export default NextAuth({
  providers: [keycloak],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({token, account}) {
      if (account) {
        token.accessToken = account.access_token
        token.refreshToken = account.refresh_token
        token.idToken = account.id_token
        token.providerAccountId = account.providerAccountId
        token.scope = account.scope
        token.session_state = account.session_state
        token.token_type = account.token_type
        token.type = account.type
        token.userId = account.userId
      }
      return token;
    },
    async session({session, token}: { session: Session; token: JWT }) {
      session.accessToken = token.accessToken
      session.refreshToken = token.refreshToken
      session.idToken = token.idToken
      session.providerAccountId = token.providerAccountId
      session.scope = token.scope
      session.session_state = token.session_state
      session.token_type = token.token_type
      session.type = token.type
      session.userId = token.userId
      return session
    },
  },
});
