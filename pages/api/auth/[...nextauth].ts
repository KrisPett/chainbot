import KeycloakProvider from "next-auth/providers/keycloak";
import NextAuth, {Session} from "next-auth";
import {JWT} from "next-auth/jwt";
import * as process from "process";
import {decodeJwt} from "@/lib/JwtUtilities";

const keycloak = KeycloakProvider({
  clientId: process.env.KEYCLOAK_ID,
  clientSecret: process.env.KEYCLOAK_SECRET,
  issuer: process.env.KEYCLOAK_ISSUER,
});

const refreshAccessToken = async (token: JWT): Promise<JWT> => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  const urlencoded = new URLSearchParams();
  if (token.refresh_token) {
    urlencoded.append("grant_type", "refresh_token");
    urlencoded.append("client_id", process.env.KEYCLOAK_ID);
    urlencoded.append("refresh_token", token.refresh_token);
    urlencoded.append("client_secret", process.env.KEYCLOAK_SECRET);
  }

  return fetch(`${process.env.KEYCLOAK_ISSUER}/protocol/openid-connect/token`, {
    method: 'POST',
    headers: myHeaders,
    body: urlencoded
  })
    .then(response => {
      if (!response.ok) return Promise.reject(new Error('Failed to refresh access token'))
      return response.json()
    })
    .then(result => {
      const decodeToken = decodeJwt(result.access_token);
      if (decodeToken) {
        token.refresh_token = result.refresh_token;
        token.access_token = result.access_token;
        token.id_token = result.id_token;
        token.expires_at = decodeToken.exp
        return token
      } else {
        return Promise.reject(new Error('Failed to decode access token'))
      }
    })
    .catch(error => {
      console.error(error)
      token.error = "RefreshAccessTokenError"
      return token
    });
}

export default NextAuth({
  providers: [keycloak],
  secret: process.env.NEXTAUTH_SECRET,
  session: {maxAge: 36000},
  callbacks: {
    jwt: async ({token, account}) => {
      if (token.expires_at) {
        const expiresAt = new Date(token.expires_at * 1000);
        const currentTime = new Date(Date.now());
        if (currentTime.getTime() < expiresAt.getTime()) {
          return token;
        }
      }
      if (account) {
        token.access_token = account.access_token;
        token.refresh_token = account.refresh_token;
        token.id_token = account.id_token;
        token.providerAccountId = account.providerAccountId;
        token.scope = account.scope;
        token.session_state = account.session_state;
        token.token_type = account.token_type;
        token.type = account.type;
        token.userId = account.userId;
        token.expires_at = account.expires_at;
      }
      return refreshAccessToken(token)
    },
    session: async ({session, token}: { session: Session; token: JWT }) => {
      session.access_token = token.access_token
      session.refresh_token = token.refresh_token
      session.id_token = token.id_token
      session.providerAccountId = token.providerAccountId
      session.scope = token.scope
      session.session_state = token.session_state
      session.token_type = token.token_type
      session.type = token.type
      session.userId = token.userId
      session.expires_at = token.expires_at
      session.error = token.error
      return session
    },
  },
});

