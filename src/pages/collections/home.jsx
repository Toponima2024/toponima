import React from "react";
import { useState, useEffect } from "react";

import { collection, getDocs } from "firebase/firestore";
import { db } from "../../fb";       
import ListCollections from "./listcollections";

export function HomeCollection() {
  const [collections, setCollections] = useState([])
  const fetchPost = async () => {      
    await getDocs(collection(db, "collections"))
      .then((querySnapshot)=>{               
        const newData = querySnapshot.docs
          .map((doc) => ({...doc.data(), id:doc.id }));
        setCollections(newData);
      })
  }

  useEffect(()=>{
    fetchPost();
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container mx-auto">      
      <div className="grid grid-cols-1 gap-6">
        <div className="border border-gray-300 bg-[url('/img/background_collection_header.png')] bg-contain bg-center bg-no-repeat  min-h-[30vh]">
          {/* Contenido de la columna derecha */}
          <img src="/img/background_collection_header.png" alt="Logo" className="hidden"  />    
        </div>
      </div>
      <div>
        <ListCollections collections={collections} />
      </div>
    </div>
  );
}

export default HomeCollection;
