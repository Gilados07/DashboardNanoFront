import { useAuth } from "@/contexts/AuthProvider";
import { FormEvent, useState } from "react";

export const Login = () => {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    login({ username, password });
  };

  return (
    <div className="flex items-center justify-center h-full">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 w-96 p-4 bg-white rounded-lg shadow-lg"
      >
        <h1 className="text-2xl font-semibold text-center">Login</h1>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          className="p-2 border border-gray-300 rounded-lg"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="p-2 border border-gray-300 rounded-lg"
        />
        <button type="submit" className="p-2 bg-blue-500 text-white rounded-lg">
          Login
        </button>
      </form>
    </div>
  );
};
