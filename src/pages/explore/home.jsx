import React from "react";
import {
  Typography,
  Button,
} from "@material-tailwind/react";

import {  Link } from "react-router-dom";
import ConceptPage from "./concept";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../fb";       
import { useState, useEffect } from "react";
import StoryCard from "./storycard";
import LoadingSpinner from "@/widgets/loading/LoadingSpinner";


export function Home() {
  const [stories, setStories] = useState([]);
  const [collections, setCollections] = useState([])
  
  
  const fetchStories = async () => {      
    await getDocs(collection(db, "story"))
      .then((querySnapshot)=>{               
        const newData = querySnapshot.docs
          .map((doc) => ({...doc.data(), id:doc.id }));
          setStories(newData);                
      })
  }

  const fetchCollections = async () => {      
    await getDocs(collection(db, "collections"))
      .then((querySnapshot)=>{               
        const newData = querySnapshot.docs
          .map((doc) => ({...doc.data(), id:doc.id }));
        setCollections(newData.sort((a, b) => a.order - b.order));
      })
  }

  useEffect(() => { 
      fetchStories();
      fetchCollections();
      
    }, []);

    if(stories.length === 0 || collections.length === 0 ) return <LoadingSpinner />  
  return (
    <div className="container mx-auto">   
      <div className="grid grid-cols-1 mx-auto"> 
        <img src="/img/header_toponyma.png" alt="Logo"  className="object-contain h-[50vh] w-full" />
        <div className="flex flex-col items-center justify-center h-full text-center">            
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
      <ConceptPage />
      <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {
                stories.map((story) => ( 
                  <Link key={story.id} to={`/explore/story/${story.id}`} className="text-blue-500">
                    <StoryCard  story={story} collectionCatalog={collections}/>
                  </Link>
                      
                    ))
              }
          </div>
      </div>
    </div>
  );
}

export default Home;
