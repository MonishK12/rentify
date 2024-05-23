
import EditPropertyForm from '@/components/EditpropertyForm';
import Navbar from '@/components/Navbar';
import Property from '@/models/property';
import React from 'react';

const getPropertyById = async (id) => {
  try {
    const res = await fetch(`/api/property/${id}`, {
      cache: "no-cache",
    });
    if (!res.ok) {
      throw new Error("Failed to fetch");
    }
    return res.json();
  } catch (err) {
    console.log("Error: ", err);
  }
};

export default async function EditProperty({ params}) {
  const { id } = params;
  console.log("id: ", id);

  const property = await Property.findById({_id:id});
  // const property = await getPropertyById(id);
  console.log(property);

  return (
    <div>
      <Navbar/>
      <EditPropertyForm property={property} />
    </div>
  );
}
