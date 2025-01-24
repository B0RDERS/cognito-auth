export interface ProtectedData {
  message: string
}
export const fetchProtectedData = async (token: string): Promise<ProtectedData> => {
  const res = await fetch('/api/protected', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch: ${res.statusText}`);
  }

  return await res.json();
};