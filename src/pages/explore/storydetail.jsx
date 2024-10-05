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
    <div style={{marginBottom:'25px'}} className="container mx-auto ">
          <div className="flex justify-end items-center bg-[url('/img/header_landing_story.jpg')] bg-cover bg-left  bg-no-repeat min-h-[50vh]">
          <div className="flex flex-col items-end justify-end text-left h-full">            
            <Typography  style={{color:'#3d3d3d', fontSize:'40px', lineHeight:'1'}} className="mb-4 font-ProximaNovaRegular">
              Meaningful Names. Meaninful Places.
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
                    backgroundColor: '#087e94',
                    width:'200px',
                    fontSize: '14px',
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
          {
            story?.description && (<ExpandableContent  htmlContent={story.description} wordLimit={75}/>)
          }
                
    </div>
  )
}

export default StoryDetail