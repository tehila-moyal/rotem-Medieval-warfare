import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import img1 from "../assets/img/img (1).jpeg";
import img2 from "../assets/img/img (2).jpeg";
import img3 from "../assets/img/img (3).jpeg";
import img4 from "../assets/img/img (4).jpeg";
import img5 from "../assets/img/img (5).jpeg";
import img6 from "../assets/img/img (6).jpeg";
import img7 from "../assets/img/img (7).jpeg";
import img8 from "../assets/img/img (8).jpeg";
import img9 from "../assets/img/img (9).jpeg";
import img10 from "../assets/img/img (10).jpeg";

const images = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10];

function PhotoCarousel() {
  return (
    <div className="relative">
      <Carousel
        useKeyboardArrows
        showThumbs={false}
        showStatus={false}
        infiniteLoop
        autoPlay
        interval={30000}
        className=""
      >
        {images.map((URL, index) => (
          <div key={index} className="h-80">
            <img
              height={''}
              alt={`Carousel Image ${index + 1}`}
              src={URL}
              className="h-auto max-w-full object-contain"
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default PhotoCarousel;
