"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { UploadButton } from "@uploadthing/react";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { deleteImage } from "@/server/delete";
import { useSession } from "next-auth/react";
export default function AddpropertyForm() {
  const { data: session } = useSession();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [doorNo, setDoorNo] = useState("");
  const [area, setArea] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");
  const [rent, setRent] = useState("");
  const [deposit, setDeposit] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const [amenities, setAmenities] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [imageUploaded, setImageUploaded] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
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

  useEffect(() => {
    console.log(imageUploaded);
  }, [imageUploaded]);

  const deleteImageHandler = async (imageUrl) => {
    const deleteRes = await deleteImage(imageUrl);
    console.log(deleteRes);
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

    if (
      !title ||
      !description ||
      !type ||
      !doorNo ||
      !area ||
      !city ||
      !state ||
      !pincode ||
      !rent ||
      !deposit ||
      !bedrooms ||
      !bathrooms ||
      !amenities ||
      !imageUploaded.length
    ) {
      setError("All fields are necessary.");
      return;
    }
    if (!session?.user?.email) {
      setError("Email not found. Please sign in.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/addproperty", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          type,
          doorNo,
          area,
          city,
          state,
          pincode,
          rent,
          deposit,
          bedrooms,
          bathrooms,
          amenities,
          images: imageUploaded,
          creatoremail: session?.user.email,
        }),
      });
      console.log("Form:", title, imageUploaded);
      if (res.ok) {
        e.target.reset();
        router.push("/");
      } else {
        const data = await res.json();
        setError(data.error || "Property listing failed.");
      }
    } catch (error) {
      setError("Error during listing: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 pt-10">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center text-gray-800">Add Your Property</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="Property Title"
            value={title}
            className="w-full px-3 py-2 border rounded-md"
          />
          <input
            onChange={(e) => setDescription(e.target.value)}
            type="text"
            placeholder="Property Description"
            value={description}
            className="w-full px-3 py-2 border rounded-md"
          />
          <input
            onChange={(e) => setType(e.target.value)}
            type="text"
            placeholder="Property Type (e.g., Apartment, House, Condo)"
            value={type}
            className="w-full px-3 py-2 border rounded-md"
          />
          <input
            onChange={(e) => setDoorNo(e.target.value)}
            type="text"
            placeholder="Door Number"
            value={doorNo}
            className="w-full px-3 py-2 border rounded-md"
          />
          <input
            onChange={(e) => setArea(e.target.value)}
            type="text"
            placeholder="Area"
            value={area}
            className="w-full px-3 py-2 border rounded-md"
          />
          <input
            onChange={(e) => setCity(e.target.value)}
            type="text"
            placeholder="City"
            value={city}
            className="w-full px-3 py-2 border rounded-md"
          />
          <input
            onChange={(e) => setState(e.target.value)}
            type="text"
            placeholder="State"
            value={state}
            className="w-full px-3 py-2 border rounded-md"
          />
          <input
            onChange={(e) => setPincode(e.target.value)}
            type="text"
            placeholder="Pincode"
            value={pincode}
            className="w-full px-3 py-2 border rounded-md"
          />
          <input
            onChange={(e) => setRent(e.target.value)}
            type="number"
            placeholder="Rent Amount"
            value={rent}
            className="w-full px-3 py-2 border rounded-md"
          />
          <input
            onChange={(e) => setDeposit(e.target.value)}
            type="number"
            placeholder="Deposit Amount"
            value={deposit}
            className="w-full px-3 py-2 border rounded-md"
          />
          <input
            onChange={(e) => setBedrooms(e.target.value)}
            type="number"
            placeholder="Number of Bedrooms"
            value={bedrooms}
            className="w-full px-3 py-2 border rounded-md"
          />
          <input
            onChange={(e) => setBathrooms(e.target.value)}
            type="number"
            placeholder="Number of Bathrooms"
            value={bathrooms}
            className="w-full px-3 py-2 border rounded-md"
          />
          <input
            onChange={(e) => setAmenities(e.target.value)}
            type="text"
            placeholder="Amenities (e.g., Swimming Pool, Gym, Parking)"
            value={amenities}
            className="w-full px-3 py-2 border rounded-md"
          />

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
                console.log("Upload Completed");
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
            {loading ? "Listing..." : "List Property"}
          </button>

          {error && (
            <div className="p-2 mt-2 text-sm text-white bg-red-500 rounded-md">
              {error}
            </div>
          )}

          <Link className="block mt-3 text-sm text-right text-gray-600" href={"/property"}>
            Go back to List Property
          </Link>
        </form>
      </div>
    </div>
  );
}
