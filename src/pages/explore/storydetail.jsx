import React, { useEffect, useState } from 'react'
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../fb";       
import { useParams } from 'react-router-dom';

import {
  Typography,
  Button,
} from "@material-tailwind/react";
import {  Link } from "react-router-dom";
import ExpandableContent from './expandablecontent';
import LoadingSpinner from '@/widgets/loading/LoadingSpinner';


function StoryDetail() {
    const { id } = useParams();
    const [story, setStory] = useState();

    
    const fetchStory = async ( id ) => { 
        try {
            const docRef = doc(db, "story", id);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const data = { ...docSnap.data(), id: docSnap.id };
                setStory(data);
               // setIsLoading(false);
              } else {
                console.log("No such document!");
              }
        } catch (error) {
            console.error("Error fetching document: ", error);
            // setIsLoading(false);
        }
      }

    useEffect(() => {
        fetchStory(id);
    }, [id])
  
  if(!story) return <LoadingSpinner />  
  return (
    <div style={{marginBottom:'25px'}} className="container mx-auto ">
      <div className="grid grid-cols-1 mx-auto"> 
      <img src="/img/header_landing_story.png" alt="Logo"   className="object-contain h-[30vh] w-full"    />    
      <div className="flex flex-col items-center justify-center text-center h-full">            
            <Typography  style={{color:'#3d3d3d', fontSize:'28px', lineHeight:'1'}} className="mb-4 font-ProximaNovaRegular">
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
              <Link to="/explore/home">
                <Button 
                className="font-ProximaNovaRegular"
                size="sm"
                style={
                  {
                    display: 'flex',
                    justifyContent:'center',
                    padding: '5px 15px',
                    textTransform: 'capitalize',
                    justifyItems:'center',
                    width:'200px',
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
          <div className="container mx-auto">
            <p className="font-ProximaNovaRegular text-2xl text-center mt-10 mb-5">{story.title}</p>
          {
            story?.description && (<ExpandableContent  htmlContent={story.description} wordLimit={75}/>)
          }
          </div>
          <div className="grid grid-cols-2 gap-2 md:gap-6">
            {story?.imagesUrls.map(( imageLink , index) => (
              <div key={index} className="flex justify-center items-center">
                <img
                  className="w-full rounded-lg object-cover object-center "
                  src={imageLink}
                  alt="imageLink"
                />
              </div>
            ))}
          </div>

    </div>
  )
}

export default StoryDetail