import { connectMongoDB } from "@/lib/mongodb";
import Property from "@/models/property";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { title, description, type, location, rent, bedrooms, bathrooms, amenities, images ,doorNo,
      area,
      city,
      state,
      pincode,deposit,creatoremail} = await req.json();
    console.log("Images new:",images)
    await connectMongoDB();
    
    // Check if the property already exists
    const existingProperty = await Property.findOne({ title, description, location });
    if (existingProperty) {
      return NextResponse.json({ message: "Property already exists." }, { status: 400 });
    }
    
    // Create the new property
    await Property.create({
      title,
      description,
      type,
      location,
      rent,
      bedrooms,
      bathrooms,
      amenities,
      images,doorNo,
      area,
      city,
      state,
      pincode,deposit,creatoremail
    });

    return NextResponse.json({ message: "Property listed successfully." }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while listing the property." },
      { status: 500 }
    );
  }
}
