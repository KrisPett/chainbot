import KeycloakProvider from "next-auth/providers/keycloak";
import NextAuth, {Session} from "next-auth";
import {JWT} from "next-auth/jwt";
import * as process from "process";

const keycloak = KeycloakProvider({
  clientId: process.env.KEYCLOAK_ID,
  clientSecret: process.env.KEYCLOAK_SECRET,
  issuer: process.env.KEYCLOAK_ISSUER,
});

const refreshAccessToken = async (token: JWT): Promise<JWT> => {
  const url = "https://auth.chaincuet.com/auth/realms/chainbot/protocol/openid-connect/token"
  if (token.refreshToken) {
    const formData = new URLSearchParams();
    formData.append('client_id', 'chatbot-client');
    formData.append('grant_type', 'refresh_token');
    formData.append('refresh_token', token.refreshToken);

    return await fetch(url, {
      method: 'POST',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      body: formData
    }).then(res => {
      if (!res.ok) return Promise.reject(new Error('Failed to refresh access token'))
      return res.json()
    }).then(tokenResponse => {
      return {...tokenResponse}

    }).catch(error => {
      console.log(error)
      token.error = "RefreshAccessTokenError"
      return {...token}
    });
  }
  token.error = "RefreshAccessTokenError"
  return {...token}
}

export default NextAuth({
  providers: [keycloak],
  secret: process.env.NEXTAUTH_SECRET,
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
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.idToken = account.id_token;
        token.providerAccountId = account.providerAccountId;
        token.scope = account.scope;
        token.session_state = account.session_state;
        token.token_type = account.token_type;
        token.type = account.type;
        token.userId = account.userId;
        token.expires_at = account.expires_at;
      } else {
        return await refreshAccessToken(token).then(resToken => {
          token.accessToken = resToken.accessToken;
          token.refreshToken = resToken.refreshToken;
          token.idToken = resToken.idToken;
          token.providerAccountId = resToken.providerAccountId;
          token.scope = resToken.scope;
          token.session_state = resToken.session_state;
          token.token_type = resToken.token_type;
          token.type = resToken.type;
          token.userId = resToken.userId;
          token.expires_at = resToken.expires_at;
          token.error = resToken.error;
          return token;
        });
      }
      return token;
    },
    session: async ({session, token}: { session: Session; token: JWT }) => {
      session.accessToken = token.accessToken
      session.refreshToken = token.refreshToken
      session.idToken = token.idToken
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

