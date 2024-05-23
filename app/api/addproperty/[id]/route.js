import { connectMongoDB } from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import Property from "@/models/property";

export async function PUT(request,{params}) {
  try {
    const {id} = params;
    const inputData = await request.json();

    const {
        title,
      description,
      type,
      location,
      rent,
      bedrooms,
      bathrooms,
      amenities,
      images
    } = inputData;

    await connectMongoDB();
    const updateProperty= await Property.findById(id);
    console.log(updateProperty);
    if (!updateProperty) {
      return NextResponse.json(
        { message: "Property doesn't exist" },
        { status: 401 }
      );
    }
    const updatedProperty = await Property.findOneAndUpdate(
      {_id:id},
      {
        title,
        description,
        type,
        location,
        rent,
        bedrooms,
        bathrooms,
        amenities,
        images
    });
    if (!updatedProperty) {
      return NextResponse.json(
        { message: "Unable to update Property Data" },
        { status: 501 }
      );
    }
    return NextResponse.json(
      { message: "Property Data Updated Successfully" },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}


// export async function DELETE(request,{params}) {
//     try{
//         // const body= await request.json();
//         const {id}=params;
//         await connectMongoDB();

//         const deleteProperty = await Property.findByIdAndDelete(id);

//         if(!deleteProperty){
//             return NextResponse.json(
//                 {message:"Property Data Not Found"},
//                 {status:404}
//             );
//         }
//         return NextResponse.json(
//             {message:"Property Data Deleted Successfully"},
//             {status:200}
//         );
//     }
//     catch(err){
//         return NextResponse.json(
//             {message: err.message},
//             {status:500}
//         );
//     }
    
// }
export async function DELETE(NextRequest, res) {
  try {
    const{userID}= NextRequest.query
    // const { id } = params;
    await connectMongoDB();

    const deleteProperty = await Property.findByIdAndDelete(id);

    if (!deleteProperty) {
      return NextResponse.json(
        { message: "Property Data Not Found" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { message: "Property Data Deleted Successfully" },
      { status: 200 }
    );
  } catch (err) {
    console.error("Error deleting property:", err); // Improved logging
    return NextResponse.json(
      { message: err.message },
      { status: 500 }
    );
  }
}




export async function GET(request,{params}){
  try{
    await connectMongoDB();
    const {id} = params; 
    const newProperty= await Property.findById(id);

    if(!newProperty){
      return NextResponse.json(
        {message:"No Property Data Found"},
        {status:404}
      );
    }

    return NextResponse.json({newProperty})
  }
  catch(err){
    return NextResponse.json(
      {message: err.message},
      {status:500}
    );
  }
}
