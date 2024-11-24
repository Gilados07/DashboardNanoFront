export const fetchRequest = async (url: string) => {
  const response = await fetch(url, { credentials: "include" });

  if (!response.ok) {
    if (response.status === 401) {
      location.replace("/login");
    }
  }

  return await response.json();
};
