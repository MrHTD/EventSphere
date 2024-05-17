import React from 'react';
import { Header } from './header';
import { EventSection } from './ExpoEventSection';
import { SliderSection } from './SliderSection';

const Home = () => {
  return (
    <>
      <Header />
      <SliderSection />
      <EventSection />
    </>
  );
}

export default Home;
