'use client'
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { UploadButton } from "@uploadthing/react";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { deleteImage } from "@/server/delete";
import Link from 'next/link';

const EditPropertyForm = ({ property }) => {
  const [title, setTitle] = useState(property.title);
  const [description, setDescription] = useState(property.description);
  const [type, setType] = useState(property.type);
  const [location, setLocation] = useState(property.location);
  const [rent, setRent] = useState(property.rent);
  const [bedrooms, setBedrooms] = useState(property.bedrooms);
  const [bathrooms, setBathrooms] = useState(property.bathrooms);
  const [amenities, setAmenities] = useState(property.amenities);
  const [imageUploaded, setImageUploaded] = useState(property.images);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? imageUploaded.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === imageUploaded.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const deleteImageHandler = async (imageUrl) => {
    const deleteRes = await deleteImage(imageUrl);
    if (deleteRes?.success) {
      setImageUploaded((prev) => [
        ...prev.slice(0, imageUploaded.indexOf(imageUrl)),
        ...prev.slice(imageUploaded.indexOf(imageUrl) + 1, imageUploaded.length),
      ]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!title || !description || !type || !location || !rent || !bedrooms || !bathrooms || !amenities || !imageUploaded.length) {
      setError("All fields are necessary.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`/api/addproperty/${property._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          type,
          location,
          rent,
          bedrooms,
          bathrooms,
          amenities,
          images: imageUploaded,
        }),
      });

      if (res.ok) {
        router.push("/");
      } else {
        const data = await res.json();
        console.log(data)
        setError(data.message || "Property update failed.");
      }
    } catch (error) {
      setError("Error during update: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 pt-10">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center text-gray-800">Edit Your Property</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Property Title</label>
            <input
              id="title"
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              placeholder="Property Title"
              value={title}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Property Description</label>
            <input
              id="description"
              onChange={(e) => setDescription(e.target.value)}
              type="text"
              placeholder="Property Description"
              value={description}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div>
            <label htmlFor="type" className="block text-sm font-medium text-gray-700">Property Type (e.g., Apartment, House, Condo)</label>
            <input
              id="type"
              onChange={(e) => setType(e.target.value)}
              type="text"
              placeholder="Property Type (e.g., Apartment, House, Condo)"
              value={type}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location (City, State, Zip Code)</label>
            <input
              id="location"
              onChange={(e) => setLocation(e.target.value)}
              type="text"
              placeholder="Location (City, State, Zip Code)"
              value={location}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div>
            <label htmlFor="rent" className="block text-sm font-medium text-gray-700">Rent Amount</label>
            <input
              id="rent"
              onChange={(e) => setRent(e.target.value)}
              type="number"
              placeholder="Rent Amount"
              value={rent}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div>
            <label htmlFor="bedrooms" className="block text-sm font-medium text-gray-700">Number of Bedrooms</label>
            <input
              id="bedrooms"
              onChange={(e) => setBedrooms(e.target.value)}
              type="number"
              placeholder="Number of Bedrooms"
              value={bedrooms}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div>
            <label htmlFor="bathrooms" className="block text-sm font-medium text-gray-700">Number of Bathrooms</label>
            <input
              id="bathrooms"
              onChange={(e) => setBathrooms(e.target.value)}
              type="number"
              placeholder="Number of Bathrooms"
              value={bathrooms}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div>
            <label htmlFor="amenities" className="block text-sm font-medium text-gray-700">Amenities (e.g., Swimming Pool, Gym, Parking)</label>
            <input
              id="amenities"
              onChange={(e) => setAmenities(e.target.value)}
              type="text"
              placeholder="Amenities (e.g., Swimming Pool, Gym, Parking)"
              value={amenities}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>

          <div className="relative flex flex-col items-center">
            {imageUploaded.length > 0 && (
              <div
                style={{
                  backgroundImage: `url(${imageUploaded[currentIndex]})`,
                }}
                className="w-full h-32 mb-4 rounded-md bg-center bg-cover"
                onClick={() => deleteImageHandler(imageUploaded[currentIndex])}
              ></div>
            )}

            <div className="flex items-center space-x-4">
              <button
                type="button"
                className="p-1 bg-gray-300 rounded-full hover:bg-gray-400"
                onClick={prevSlide}
              >
                <ChevronLeftIcon size={20} />
              </button>

              <button
                type="button"
                className="p-1 bg-gray-300 rounded-full hover:bg-gray-400"
                onClick={nextSlide}
              >
                <ChevronRightIcon size={20} />
              </button>
            </div>

            <UploadButton
              endpoint="multiFileUploader"
              onClientUploadComplete={(res) => {
                setImageUploaded((prevImages) => [
                  ...prevImages,
                  ...res.map((file) => file.url),
                ]);
              }}
              appearance={{
                button: "bg-green-500 text-white py-2 px-4 rounded mt-4",
                container: "w-full flex justify-center",
                allowedContent: "text-white text-sm",
              }}
              onUploadError={(error) => {
                console.log(`ERROR! ${error.message}`);
              }}
              className="w-full"
            />
          </div>

          <button
            className="w-full py-2 text-white bg-green-600 rounded-md hover:bg-green-700"
            type="submit"
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Property"}
          </button>

          {error && (
            <div className="p-2 mt-2 text-sm text-white bg-red-500 rounded-md">
              {error}
            </div>
          )}

          <Link className="block mt-3 text-sm text-right text-gray-600" href={"/property"}>
            Go back to Property List
          </Link>
        </form>
      </div>
    </div>
  );
}

export default EditPropertyForm;
