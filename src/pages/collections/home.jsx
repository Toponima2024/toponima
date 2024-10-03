import React from "react";
import { useState, useEffect } from "react";

import { collection, getDocs } from "firebase/firestore";
import { db } from "../../fb";       
import ListCollections from "./listcollections";

import {
  Typography,
  Button,
} from "@material-tailwind/react";

import {  Link } from "react-router-dom";



export function HomeCollection() {
  const [collections, setCollections] = useState([])
  const fetchPost = async () => {      
    await getDocs(collection(db, "collections"))
      .then((querySnapshot)=>{               
        const newData = querySnapshot.docs
          .map((doc) => ({...doc.data(), id:doc.id }));
        setCollections(newData.sort((a, b) => a.order - b.order));
      })
  }

  useEffect(()=>{
    fetchPost();
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container mx-auto">      
      <div className="grid grid-cols-1 gap-6">
        <div className="bg-[url('/img/background_collection_header.png')] bg-contain bg-center bg-no-repeat  min-h-[30vh]">
          {/* Contenido de la columna derecha */}
          <div className="flex flex-col items-center justify-center h-full text-center">            
              <Typography variant="h3" style={{color:'#6b7280'}} className="mb-4">
                Meaningful Names. Meaninful Places.
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
              <Link to="/explore/home">
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
                  Go To Explore
                </Button>
              </Link>
        </div> 
        </div>
      </div>
      <div 
        className="text-center bg-[#cccccc] p-2 mt-2 mb-2"
        style={{fontWeight:'bold'}}  
      >
      "Every street, every place is part of a collections of stories."
      </div>
      <div>
        <ListCollections collections={collections} />
      </div>
    </div>
  );
}

export default HomeCollection;
