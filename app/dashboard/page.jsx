// "use client"
// import Navbar from "@/components/Navbar";
// import UserInfo from "@/components/UserInfo";
// import { useRouter } from "next/navigation";


// export default  function Dashboard() {

//   return (
//     <>
//     <Navbar/>
//       <UserInfo />
//     </>
//   );
// }

import LoginForm from "@/components/LoginForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";
import Navbar from "@/components/Navbar";
import PropertyPreview from "@/components/PropertyPreview";
import { connectMongoDB } from "@/lib/mongodb";
import Property from "@/models/property";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  

    await connectMongoDB();
    const PropertyData= await Property.find({})
      .limit(10)
      .sort([["createdAt", "descending"]]);

      // console.log(PropertyData)

  if (!session) redirect("/");

  return (
    <main >
      <Navbar />
      <div className="w-full flex justify-center my-4">

      <div className="flex flex-col w-[55%] justify-center items-center space-y-4">
      <div className="self-center text-3xl text-emerald-500 ">Latest Additions</div>
      <div className="w-[5%] self-end">
      <Button className="py-2 bg-emerald-500"><Link href="/propertyDisplay" >View All</Link></Button>
      </div>
      </div>
      </div>
      <div className="w-[95%]">
        <PropertyPreview propertyData={PropertyData} />
      </div>
    </main>
  );
}

