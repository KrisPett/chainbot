import KeycloakProvider from "next-auth/providers/keycloak";
import NextAuth, {Session} from "next-auth";
import {JWT} from "next-auth/jwt";
import * as process from "process";
import {Awaitable} from "next-auth/core/types";

const keycloak = KeycloakProvider({
  clientId: process.env.KEYCLOAK_ID,
  clientSecret: process.env.KEYCLOAK_SECRET,
  issuer: process.env.KEYCLOAK_ISSUER,
});

const refreshAccessTosken = async (token: JWT): Promise<JWT> => {
  // function body remains the same
}

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
    }).then(data => {
      const accessToken = data.access_token;
      const expiresIn = data.expires_in;
      const newRefreshToken = data.refresh_token ?? token.refreshToken;
      const accessTokenExpires = Date.now() + expiresIn * 1000;

      return {
        ...token,
        accessToken,
        refreshToken: newRefreshToken,
        expires_at: accessTokenExpires / 1000,
      };
    }).catch(error => {
      console.log(error)
      return {...token, error: "RefreshAccessTokenError"}
    });
  }
}

export default NextAuth({
  providers: [keycloak],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    jwt: async ({token, account}) => {
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
        token.expires_at = account.expires_at

        // if (account.expires_at) {
        //   const expiresAt = new Date(account.expires_at * 1000);
        //   const currentTime = new Date(Date.now());
        //
        //   if (currentTime.getTime() >= expiresAt.getTime()) {
        //     return await refreshAccessToken(token).then(refreshedToken => {
        //       token.refreshToken = refreshedToken.refreshToken
        //       token.accessToken = refreshedToken.accessToken
        //       token.idToken = refreshedToken.idToken
        //       token.providerAccountId = refreshedToken.providerAccountId
        //       token.scope = refreshedToken.scope
        //       token.session_state = refreshedToken.session_state
        //       token.token_type = refreshedToken.token_type
        //       token.type = refreshedToken.type
        //       token.userId = refreshedToken.userId
        //       token.expires_at = refreshedToken.expires_at
        //       token.error = refreshedToken.error
        //       return token
        //     });
        //   }
        // }
        if (account.expires_at) {
          const expiresAt = new Date(account.expires_at * 1000);
          const currentTime = new Date(Date.now());
          if (currentTime.getTime() < expiresAt.getTime())
            return token
        }
        return refreshAccessToken(token)
      }
    },
    session: async ({session, token}: { session: Session; token: JWT }) => {
      console.log("session")
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

