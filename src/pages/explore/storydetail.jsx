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


function StoryDetail() {
    const { id } = useParams();
    const [story, setStory] = useState({});

    
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
      

console.log(story)
  return (
    <div style={{marginBottom:'25px'}} className="container mx-auto">
          <div style={{marginTop:'-8rem'}} className="bg-[url('/img/header_landing_story.jpg')] bg-contain bg-left  bg-no-repeat min-h-[50vh]">
          <div className="flex flex-col items-center justify-center text-center">            
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
              <Typography variant="h6" color="blue-gray" className="mb-4">
                Every street, every place is part of a
                collections of stories.
              </Typography>
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
                  Go To Collections
                </Button>
              </Link>
          </div> 
          </div>
          {
            story?.description && (<ExpandableContent  htmlContent={story.description} wordLimit={75}/>)
          }
                
    </div>
  )
}

export default StoryDetail