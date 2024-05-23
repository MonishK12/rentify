import mongoose, { Schema, models } from "mongoose";

const propertySchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    
      doorNo:{
        type: String,
        required: true,
      },
      area:{
        type:String,
        required:true,
      },
      city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    pincode:{
      type:String,
      required:true
    },
  
    rent: {
      type: Number,
      required: true,
    },
    deposit: {
      type: Number,
      required: true,
    },
    bedrooms: {
      type: Number,
      required: true,
    },
    bathrooms: {
      type: Number,
      required: true,
    },
    amenities: {
      type: String,
      required: true,
    },
    images: {
      type: [String], 
      required :true// Array of strings to store image URLs
    },
    creatoremail:{
      type:String,
      required:true
    }
  },
  { timestamps: true }
);

const Property = mongoose.models?.Property || mongoose.model("Property", propertySchema);
export default Property;
