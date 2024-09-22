import React from "react";
import { AboutCard } from "./aboutcard";
       

export function HomeAbout() {
  return (
    <div className="container mx-auto">      
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  <div className="order-2 md:order-1 border border-gray-300">
  Meaningful Names. Meaninful Places.
  The Story Is on the Map.
  Every street, every place is part of a
  collections of stories.
    
  </div>
  <div className="order-1 md:order-2 border border-gray-300 bg-[url('/img/header_about.png')] bg-contain bg-center bg-no-repeat  min-h-[30vh]">
    {/* Contenido de la columna derecha */}
    <img src="/img/header_about.png" alt="Logo" className="hidden"  />    
  </div>
</div>
<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mb-5">
  <AboutCard id={1} />
  <AboutCard id={2} />
  <AboutCard id={3} />
  <AboutCard id={4} />
  <AboutCard id={5} />
  <AboutCard id={6} />
</div>
    </div>
  );
}

export default HomeAbout;
