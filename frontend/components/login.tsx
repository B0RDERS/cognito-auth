"use client";

import { useAuth } from "react-oidc-context";

interface Profile {
  "cognito:username"?: string;
  email?: string;
}

export default function Login() {
  const auth = useAuth();

  if (auth.isLoading) {
    return <div>Login Loading</div>;
  }
  
  if (!auth.isAuthenticated) {
    return (
      <div>
        <button onClick={() => auth.signinRedirect()}>Sign in</button>
      </div>
    );
  }
  
  const userProfile = auth.user?.profile as Profile;
  return (
    <div>
      <pre>Username: {userProfile["cognito:username"]}</pre>
      <pre>Email: {userProfile.email}</pre>
      <button onClick={() => auth.removeUser()}>Sign out</button>
    </div>
  );
}
