import React from 'react';
import { Header } from './header';
import { EventSection } from './ExpoEventSection';
import { SliderSection } from './SliderSection';
import { Footer } from './Footer';

const Home = () => {
  return (
    <>
      <Header />
      <SliderSection />
      <EventSection />
      <Footer/>
    </>
  );
}

export default Home;
