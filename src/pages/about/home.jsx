import React from "react";
import { AboutCard } from "./aboutcard";

import {
  Typography,
  Button,
} from "@material-tailwind/react";
import {  Link } from "react-router-dom";
       

export function HomeAbout() {
  return (
    <div className="container mx-auto">      
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-5 mt-2">
  <div className="order-2 md:order-1">
  <div className="flex flex-col items-center justify-center h-full text-center"> 
  <Typography variant="h3" style={{color:'#6b7280'}} className="mb-4">
    Meaningful Names. <br/>Meaninful Places.
  </Typography>
  <span
      style={{
        display: "block",
        fontSize: "16px",
        color: "#5bafc5",
        fontWeight: "600",
        lineHeight: '2.5',
      }}
    >
      The Story Is on the Map.
    </span>
    <Typography variant="h6" color="blue-gray" className="mb-4">
      "Every street and every place is home to a collection of stories."
    </Typography>
    <Link to="/collections/home">
                <Button 
                style={
                  {
                    display: 'flex',
                    justifyContent:'center',
                    textTransform: 'capitalize',
                    justifyItems:'center',
                    backgroundColor: '#5bafc5',
                    width:'200px',
                    fontSize: '14px',
                    borderRadius :'12px',
                    '&:hover': {
                        backgroundColor: '#5bafc5',
                        boxShadow: 'none',
                      },
                      '&:active': {
                        boxShadow: 'none',
                        backgroundColor: '#5bafc5',
                      }
                  }
                }
                >
                  Go To Collections
                </Button>
    </Link>
  </div>
  </div>
  <div className="order-1 md:order-2  flex items-center justify-center" >
    {/* Contenido de la columna derecha */}
    <img src="/img/header_about.png" style={{height:'500px', width:'auto'}} alt="Logo"   className="object-contain h-full w-full"   />    
  </div>
</div>
<div 
  className="text-center bg-[#cccccc] p-2 mt-2 mb-2"
  style={{fontWeight:'bold'}}  
>
"Toponima is aimed at exploring the rich history and hidden meanings behind
toponyms. We want to gain a unique insight into the culture and heritage of our
cities."
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
