import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusCircle } from "lucide-react";
import Link from "next/link";

import PropertyDataTable from "./producttable/PropertyDataTable.";
import PropertyColumns from "./producttable/PropertyColumn";

// import  PropertyDataTable  from "./Propertytable/PropertyDataTable";

const PropertyListDashboard = ({ propertys }) => {
  return (
    <Tabs defaultValue="all">
      <div className="flex items-center justify-end w-full">
        <div>
          <Button size="sm" className="h-7 gap-1">
            <Link href={`${process.env.NEXT_PUBLIC_CLIENT_SIDE_URL}/Addproperty`} className="flex items-center justify-center gap-2 rounded-full bg-primary font-semibold">
              <PlusCircle className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Add Property
              </span>
            </Link>
          </Button>
        </div>
      </div>
      <TabsContent value="all">
        <Card>
          <CardHeader>
            <CardTitle><span className="text-green-500">Property Management</span></CardTitle>
            <CardDescription>Manage your properties.</CardDescription>
          </CardHeader>
          <CardContent>
            <PropertyDataTable columns={PropertyColumns} data={propertys || []} />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default PropertyListDashboard;
