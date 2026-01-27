"use client";

import { useState } from "react";
import { Button } from "@/components/Ui/button";
import { useLoginMutation } from "@/state/api";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();
  // Use the API mutation hook
  const [login, { isLoading }] = useLoginMutation();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      // 1. Call the API
      const res = await login({
        email: formData.email,
        password: formData.password,
      }).unwrap();

      // 2. Save the Token (standard practice)
      localStorage.setItem("token", res.token);

      // 3. Save the User Object (CRITICAL)
      // Your AuthProvider checks localStorage.getItem("user") to set isAuthenticated.
      // We assume res.user exists. If your API only returns a token,
      // we create a basic user object so the app allows access.
      const userToSave = res.user || {
        email: formData.email,
        id: "user_" + Date.now(),
      };

      localStorage.setItem("user", JSON.stringify(userToSave));

      // 4. Force a hard reload
      // This triggers the AuthProvider to re-run its useEffect,
      // find the "user" in localStorage, and render the HomePage.
      router.push("/");
    } catch (err: unknown) {
      console.error("Login failed:", err);
      setError( "Invalid credentials");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-card border-border rounded-2xl border p-8 shadow-lg"
    >
      {error && (
        <p className="text-destructive mb-4 text-center font-medium">{error}</p>
      )}

      <div className="mb-5">
        <label className="mb-2 block text-sm font-semibold">Email</label>
        <input
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          className="focus:ring-primary w-full rounded-lg border px-4 py-3 transition-all outline-none focus:ring-2"
          required
        />
      </div>

      <div className="mb-5">
        <label className="mb-2 block text-sm font-semibold">Password</label>
        <input
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          className="focus:ring-primary w-full rounded-lg border px-4 py-3 transition-all outline-none focus:ring-2"
          required
        />
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? (
          <div className="flex items-center justify-center gap-2">
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            <span>Signing in...</span>
          </div>
        ) : (
          "Sign In"
        )}
      </Button>
    </form>
  );
}
