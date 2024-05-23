
import React from "react";
import FilterSection from "@/components/FilterSection";
import { connectMongoDB } from "@/lib/mongodb";
import Property from "@/models/property";
import Navbar from "@/components/Navbar"

const PropertyDisplay = async () => {
    await connectMongoDB();
    const PropertyData= await Property.find({})
  return (
    <div>
      <div> <Navbar/></div>
    <div className="flex flex-col m-6">
     
      <FilterSection propertyData={PropertyData} />
    </div>
    </div>
  );
};

export default PropertyDisplay;
