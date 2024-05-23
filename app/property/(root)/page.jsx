import { connectMongoDB } from "@/lib/mongodb";
import Property from "@/models/property";
import PropertyListDashboard from "./components/PropertyListDashboard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PackageIcon } from "lucide-react";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import Navbar from "@/components/Navbar";

const PropertyPage = async () => {
  const session = await getServerSession(authOptions);
  if(!session) redirect("/");
  await connectMongoDB();
  const propertys = await Property.find({
    creatoremail: session?.user.email,
  }).lean();
   const properties =  JSON.stringify(propertys)
  return (
    <div>
      <Navbar/>
    <section className="mx-28 mt-10">
      {propertys.length > 0 ? (
        <>
          {/* <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-6 mb-5">
            <Card x-chunk="dashboard-01-chunk-0">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Products
                </CardTitle>
                <PackageIcon className="h-7 w-7 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{products.length}</div>
              </CardContent>
            </Card>
          </div> */}
          
          <div className="text-3xl text-center text-green-500 font-bold pb-10">Your Properties</div>
          <PropertyListDashboard propertys={JSON.parse(properties)} /> 
        </>
      ) : (
        <section>
          <div>No products available</div>
        </section>
      )}
    </section>
    </div>
  );
};

export default PropertyPage;
