import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Image1 from './assets/slider1.jpg';
import Image2 from './assets/slider2.jpg';
import Image3 from './assets/slider2.jpg';

export const SliderSection = () => {
    const [index, setIndex] = useState(0);
    const images = [Image1, Image2, Image3]; // Add more images as needed

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };

    return (
        <>
            <Carousel activeIndex={index} onSelect={handleSelect} indicators={false}>
                {images.map((image, idx) => (
                    <Carousel.Item key={idx}>
                        <img src={image} className='d-block w-100' alt={`Slide ${idx + 1}`} style={{ height: '500px', objectFit: 'cover' }} />
                    </Carousel.Item>
                ))}
            </Carousel>
            <div className="custom-indicators">
                {images.map((_, idx) => (
                    <span key={idx} className={index === idx ? 'active' : ''} onClick={() => handleSelect(idx)}></span>
                ))}
            </div>
        </>
    );
};
