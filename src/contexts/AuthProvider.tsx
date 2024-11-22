import {
  QueryClient,
  UseMutateFunction,
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import { createContext, useContext, ReactNode } from "react";
import { useNavigate } from "react-router-dom";

interface AuthContextType {
  user: string | null;
  login: UseMutateFunction<
    unknown,
    Error,
    { username: string; password: string },
    unknown
  >;
  logout: UseMutateFunction<unknown, Error, void, unknown>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const queryClient = new QueryClient();
  const { data: user } = useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/auth/me`,
        {
          credentials: "include",
        }
      );
      if (!response.ok) {
        console.log("Not logged in");
      }
      return await response.json();
    },
  });
  const { mutate: login } = useMutation({
    mutationFn: async ({
      username,
      password,
    }: {
      username: string;
      password: string;
    }) => {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/auth/login`,
        {
          method: "POST",
          body: JSON.stringify({ username, password }),
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["me"] });
      navigate("/");
    },
  });
  const { mutate: logout } = useMutation({
    mutationFn: () =>
      fetch(`${import.meta.env.VITE_BACKEND_URL}/logout`).then((res) =>
        res.json()
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["me"] });
      navigate("/");
    },
  });

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
