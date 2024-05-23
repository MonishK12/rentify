import LoginForm from '@/components/LoginForm'
import React from 'react'
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from '../api/auth/[...nextauth]/route';
async function Login(){
  const session = await getServerSession(authOptions);
  if (session) redirect("/dashboard");
  return (
    <div>
      <LoginForm/>
    </div>
  )
}

export default Login
