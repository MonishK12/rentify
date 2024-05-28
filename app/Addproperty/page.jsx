

// import AddpropertyForm from '../../components/AddpropertyForm'

import AddpropertyForm from '@/components/AddpropertyForm'
import React from 'react'
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from '../api/auth/[...nextauth]/route';
import Navbar from '@/components/Navbar';

async function Addproperty() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");
  return (
    <div >
      <Navbar/>
      <AddpropertyForm/>
    </div>
  )
}

export default Addproperty
