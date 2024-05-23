import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const MyCard = ({ propertyData }) => {
  const { title,images, rent , bedrooms, deposit,location,_id,doorNo, area,pincode,state, city  } = propertyData;
  const FullAddress = "No." +
  doorNo +
  ", " +
  area +
  ", " +
  city +
  "-" +
  pincode +
  ", " +
  state;
    
  
  return (
    <div className="">
      <Link href={`/propertyDisplay/${_id}`}>
        <Card className=" flex flex-col justify-between relative shadow-md overflow-hidden rounded-xl border border-gray-100 my-card transition-all duration-300 transform hover:scale-105">
          <div className="flex">
            <div className="w-3/4 ">
              <Image
                src={images?.at(0)}
                alt={title}
                width={150}
                height={150}
                className="aspect-square object-contain rounded-sm bg-white  w-full overflow-y-auto "
              />
            </div>
            {/* right side section */}
            <div className="mt-4 flex flex-col w-1/4 justify-between items-center justify-items-center"> 
              <div className="w-auto flex flex-col justify-center">
                <Badge className="">{bedrooms}BHK</Badge>
              </div>
              <div className="w-auto flex flex-col justify-center">
                <Badge>₹ {rent}</Badge>
                <div className="text-md self-center text-emerald-500">Rent</div>
              </div>
              <div className="w-auto flex flex-col justify-center">
                <Badge>₹ {deposit}</Badge>
                <div className="text-md self-center text-emerald-500">Deposit</div>
              </div>
            </div>
          </div> 
          <div className="py-4"></div>
          <div className=" px-2 py-3 bg-emerald-500">
            <div className="space-y-1 font-medium truncate text-white">{title}</div>
            <p className="line-clamp-2 text-sm text-white">{FullAddress}</p>
          </div>
        </Card>
      </Link>
    </div>
  );
};

export default MyCard;
