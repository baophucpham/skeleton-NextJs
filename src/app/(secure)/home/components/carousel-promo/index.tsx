"use client";
import React from "react";

import { CarouselWrapper } from "./carousel-promo.styled";

const MOCK_DATA = [
  {
    img: "https://images.pexels.com/photos/1379636/pexels-photo-1379636.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    img: "https://images.pexels.com/photos/7919/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    img: "https://images.pexels.com/photos/1612351/pexels-photo-1612351.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    img: "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    img: "https://images.pexels.com/photos/843227/pexels-photo-843227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
];

const CarouselPromo = () => {
  return (
    <CarouselWrapper
      autoplay
      autoplaySpeed={5000}
      easing='ease-out'
      pauseOnHover
    >
      {MOCK_DATA.map(({ img }) => (
        <div className='carousel-item'>
          <img src={img} alt='promo' loading='lazy' />
        </div>
      ))}
    </CarouselWrapper>
  );
};

export default CarouselPromo;
