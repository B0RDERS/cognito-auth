"use client"

import { AuthProvider, AuthProviderProps } from "react-oidc-context";

const clearQuery = () => {
  const url = new URL(window.location.href);
  url.search = "";
  window.history.replaceState(null, document.title, url.toString());
};

const cognitoAuthConfig: AuthProviderProps = {
  authority: process.env.NEXT_PUBLIC_AUTH_URL,
  client_id: process.env.NEXT_PUBLIC_AUTH_CLIENT_ID,
  redirect_uri: process.env.NEXT_PUBLIC_HOST,
  onSigninCallback: clearQuery,
};


export default function Auth({ children }: { children: React.ReactNode }) {
  return <AuthProvider {...cognitoAuthConfig}>{children}</AuthProvider>;
}
