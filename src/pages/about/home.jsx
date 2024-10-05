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
          <div className="grid grid-cols-1 mx-auto"> 
            <img src="/img/header_about.png" alt="Logo"   className="object-contain h-[50vh] w-full"    />    
            <div className="flex flex-col items-center justify-start  h-full text-center md:justify-center">            
              <Typography  style={{color:'#3d3d3d', fontSize:'40px', lineHeight:'1'}} className="mb-4 font-ProximaNovaRegular">
                Meaningful Names.<br/> Meaningful Places.
              </Typography>
              <span className="font-ProximaNovaRegular"

                style={{
                  display: "block",
                  fontSize: "16px",
                  color: "#087e94",
                  lineHeight: '2.5',
                }}
              >
                The Story Is on the Map.
              </span>
              <Typography style={{color:'#6d6d6d', lineHeight: '1.25', fontSize:'16px'}} className="mb-4 font-ProximaNovaRegular">
                Every street, every place is part of a
                collections of stories.
              </Typography>
              <Link to="/collections/home">
                <Button 
                className="font-ProximaNovaRegular"
                size="sm"
                style={
                  {
                    display: 'flex',
                    padding: '5px 15px',
                    justifyContent:'center',
                    textTransform: 'capitalize',
                    justifyItems:'center',
                    backgroundColor: '#087e94',
                    fontSize:'16px',
                    lineHeight:'2',
                    borderRadius :'12px',
                    '&:hover': {
                        backgroundColor: '#5bafc5',
                        boxShadow: 'none',
                      },
                      '&:active': {
                        boxShadow: 'none',
                        backgroundColor: '#087e94',
                      }
                  }
                }
                >
                  Go To Collections
                </Button>
              </Link>
            </div> 
          </div>       
<div 
  className="text-center bg-[#cccccc] p-2 mt-2 mb-2 font-ProximaNovaRegular w-full md:w-3/5 mx-auto"
  style={{color:'#3d3d3d', fontWeight:'bold', fontSize:'18px', lineHeight:'1.667'}}
>
Toponima <span style={{color:'#087e94'}}>is aimed at exploring the rich history and hidden meanings behind
toponyms. We want to gain a unique insight into the culture and heritage of our
cities.</span>
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
