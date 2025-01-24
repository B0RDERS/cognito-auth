"use client";

import { useEffect, useState } from "react";
import { useAuth } from "react-oidc-context";
import { fetchProtectedData, ProtectedData } from "@/lib/api";

export default function ProtectedContent() {
  const auth = useAuth();
  const [response, setResponse] = useState<ProtectedData | null>(null);

  useEffect(() => {
    if(auth.user?.access_token) {
      fetchProtectedData(auth.user.access_token).then(res => {
        setResponse(res);
      });
    }
  }, [auth.user?.access_token]);
  
  if (auth.isLoading) {
    return <div>Protected Content Awaiting Auth</div>;
  }
  
  if (!auth.isAuthenticated) {
    return <div>Protected Content Unavailable</div>;
  }

  return (
    <div>
      {response ? response.message : "Protected Content Loading"}
    </div>
  );
}
