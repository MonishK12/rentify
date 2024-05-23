import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel";
  import MyCard from "./MyCard";
  
  export default function PropertyPreview({ propertyData }) {
    return (
      <div className="w-full flex justify-center">
        <Carousel
          opts={{
            align: "center",
            loop: true,
            dragFree: true,
          }} 
        >
          <CarouselContent>
            {propertyData?.map((item, index) => (
              <CarouselItem key={index} className="p-4 sm:basis-1 md:basis-1/2 lg:basis-1/3">
                <MyCard propertyData={item} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    );
  }
  