"use client";

import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter ,redirect } from "next/navigation";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res.error) {
        setError("Invalid Credentials");
        return;
      }

      router.push("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 h-screen">
      <div
        className="hidden lg:block bg-cover bg-center"
        style={{ backgroundImage: "url('/loginimage.png')" }}
      >
        {/* Left side with the image */}
      </div>
      <div className="flex items-center justify-center">
        <div className="shadow-lg p-5 rounded-lg border-t-4 border-green-400 w-full max-w-md">
          <h1 className="text-xl font-bold my-4">Login</h1>

          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              placeholder="Email"
              className="p-2 border rounded"
            />
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
              className="p-2 border rounded"
            />
            <button className="bg-green-600 text-white font-bold cursor-pointer px-6 py-2 rounded">
              Login
            </button>
            {error && (
              <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
                {error}
              </div>
            )}

            <Link className="text-sm mt-3 text-right" href={"/register"}>
              Don&apos;t have an account? <span className="underline">Register</span>
            </Link>
             <Link className="text-sm mt-3 text-right" href={"/"}>
            Back To Home? <span className="underline">Home</span>
          </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
