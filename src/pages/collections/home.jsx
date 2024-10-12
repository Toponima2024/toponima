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
import LoadingSpinner from "@/widgets/loading/LoadingSpinner";



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
  if(collections.length === 0 ) return <LoadingSpinner />  

  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-1 gap-6">
        <div className="bg-[url('/img/header_collections.png')] bg-contain bg-center bg-no-repeat  min-h-[30vh]">
          {/* Contenido de la columna derecha */}
          <div className="flex flex-col items-center justify-center h-full text-center">            
              <Typography  style={{color:'#3d3d3d', fontSize:'40px', lineHeight:'1'}} className="mb-4 font-ProximaNovaRegular">
                Meaningful Names.<br/> Meaninful Places.
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
              <Link to="/explore/home">
                <Button 
                size="sm"
                className="font-ProximaNovaRegular"
                style={
                  {
                    display: 'flex',
                    padding: '5px 15px',
                    justifyContent:'center',
                    textTransform: 'capitalize',
                    justifyItems:'center',
                    backgroundColor: '#087e94',
                    fontSize: '14px',
                    lineHeight:'2',
                    // width:'200px',
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
                  Go To Explore
                </Button>
              </Link>
        </div> 
        </div>
      </div>
      <div 
        className="text-center bg-[#cccccc] p-2 mt-2 mb-2 font-ProximaNovaRegular w-full md:w-3/5 mx-auto"
        style={{fontSize:'18px', lineHeight:'1.333'}}  
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
