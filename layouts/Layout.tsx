import React from "react";
import Header from "./Header";
import {signIn, useSession} from "next-auth/react";

type Props = {
  children: JSX.Element;
};

const Layout = ({children}: Props) => {
  const {data: session, status} = useSession({required: true, onUnauthenticated: () => signIn('keycloak')});
  const loading = status === 'loading';
  if (loading) return <></>
  if(session?.error === "RefreshAccessTokenError") return signIn('keycloak')

  if(session?.expires_at) {
    const expiresAt = new Date(session.expires_at * 1000);
    const currentTime = new Date(Date.now());
    if(currentTime.getTime() >= expiresAt.getTime()) {
      console.log("Token is expired")
      console.log("expiresAt: " + expiresAt)
      console.log("currentTime: " + currentTime)
      console.log(session.accessToken)
    }
    else {
      console.log("Token is still valid")
      console.log("expiresAt: " + expiresAt)
      console.log("currentTime: " + currentTime)
      console.log(session.accessToken)
    }
    console.log(session)
  }
  return (
    <div className={"min-h-screen mx-auto flex max-w-full flex-col"}>
      <Header/>
      <main className="mb-20 flex-1">{children}</main>
    </div>
  );
};

export default Layout;
