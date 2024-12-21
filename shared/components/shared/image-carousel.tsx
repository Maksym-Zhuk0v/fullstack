import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { Card, CardContent } from "../ui/card";

interface ImageCarouselProps {
  images: string[];
  className?: string;
}

const ImgageCarousel = ({ images, className }: ImageCarouselProps) => {
  return (
    <Carousel className={className}>
      <CarouselContent>
        {images.map((image) => (
          <CarouselItem key={image}>
            <Card className="h-full w-full p-0">
              <CardContent className="h-full w-full p-0">
                <img
                  src={image}
                  alt="image"
                  className="h-full w-full object-cover"
                />
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default ImgageCarousel;
