"use client";

import { useState } from "react";
import { Button } from "@/components/Ui/button";
import { useSignupMutation } from "@/state/api";
import { useRouter } from "next/navigation";

export default function SignupForm() {
  const router = useRouter();
  const [signup, { isLoading }] = useSignupMutation();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const res = await signup({
        username: formData.username,
        email: formData.email,
        password: formData.password,
      }).unwrap();

      localStorage.setItem("token", res.token);
      console.log("Signup successful");
      router.push("/login");
    } catch (err: unknown) {
      if (
        err &&
        typeof err === "object" &&
        "data" in err &&
        typeof (err as any).data?.message === "string"
      ) {
        setError((err as any).data.message);
      } else {
        setError("Signup failed");
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-card border-border rounded-2xl border p-8 shadow-lg"
    >
      {error && <p className="text-destructive mb-4">{error}</p>}

      <div className="mb-5">
        <label className="mb-2 block text-sm font-semibold">Username</label>
        <input
          name="username"
          value={formData.username}
          onChange={handleChange}
          className="w-full rounded-lg border px-4 py-3"
          required
        />
      </div>

      <div className="mb-5">
        <label className="mb-2 block text-sm font-semibold">Email</label>
        <input
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full rounded-lg border px-4 py-3"
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
          className="w-full rounded-lg border px-4 py-3"
          required
        />
      </div>

      <div className="mb-6">
        <label className="mb-2 block text-sm font-semibold">
          Confirm Password
        </label>
        <input
          name="confirmPassword"
          type="password"
          value={formData.confirmPassword}
          onChange={handleChange}
          className="w-full rounded-lg border px-4 py-3"
          required
        />
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Creating account..." : "Create Account"}
      </Button>
    </form>
  );
}
