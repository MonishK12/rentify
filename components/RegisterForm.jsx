"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneno, setPhoneno] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const validatePhone = (phoneno) => {
    const re = /^\d{10}$/;
    return re.test(phoneno);
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!firstname || !lastname || !phoneno || !email || !password) {
      setError("All fields are necessary.");
      return;
    }

    if (!validateEmail(email)) {
      setError("Invalid email format.");
      return;
    }

    if (!validatePhone(phoneno)) {
      setError("Mobile Number should contains 10 digits");
      return;
    }



    setLoading(true);
    try {
      const resUserExists = await fetch("/api/userExists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!resUserExists.ok) {
        throw new Error("Failed to check if user exists.");
      }

      const { user } = await resUserExists.json();
      if (user) {
        setError("User already exists.");
        setLoading(false);
        return;
      }

      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstname,
          lastname,
          phoneno,
          email,
          password,
        }),
      });

      if (res.ok) {
        e.target.reset();
        router.push("/");
      } else {
        setError("User registration failed.");
      }
    } catch (error) {
      setError("Error during registration: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid place-items-center h-screen">
      <div className="shadow-lg p-5 rounded-lg border-t-4 border-green-400">
        <h1 className="text-xl font-bold my-4">Register</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            onChange={(e) => setFirstname(e.target.value)}
            type="text"
            placeholder="First Name"
            
          />
          <input
            onChange={(e) => setLastname(e.target.value)}
            type="text"
            placeholder="Last Name"
            
          />
          <input
            onChange={(e) => setPhoneno(e.target.value)}
            type="text"
            placeholder="Mobile Number"
            
          />
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
            
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            
          />
          <button
            className="bg-green-600 text-white font-bold cursor-pointer px-6 py-2"
            type="submit"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>

          {error && (
            <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
              {error}
            </div>
          )}

          <Link className="text-sm mt-3 text-right" href={"/login"}>
            Already have an account? <span className="underline">Login</span>
          </Link>
        </form>
      </div>
    </div>
  );
}
