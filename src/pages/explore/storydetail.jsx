import React, { useEffect, useState } from 'react'
import { XMarkIcon, ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

import { doc, getDoc } from "firebase/firestore";
import { db } from "../../fb";       
import { useParams } from 'react-router-dom';

import {
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";
import {  Link } from "react-router-dom";
import ExpandableContent from './expandablecontent';
import LoadingSpinner from '@/widgets/loading/LoadingSpinner';


function StoryDetail() {
    const { id } = useParams();
    const [story, setStory] = useState();
    const [selectedImg, setSelectedImg] = useState(0);
    // const [openDialog, setOpenDialog] = useState(false);
    const [imgPop, setImgPop] = useState(false);
    const swipeImg = (moveType) => {
      if (moveType == "prv") {
        if (selectedImg == 0) setSelectedImg(story?.imagesUrls.length - 1);
        else setSelectedImg(selectedImg - 1);
      }
  
      if (moveType == "nxt") {
        if (selectedImg == story?.imagesUrls.length - 1) setSelectedImg(0);
        else setSelectedImg(selectedImg + 1);
      }
    };
    
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
        window.scrollTo({ top: 0, behavior: 'smooth' });
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
                  Go To Explore
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
                  onClick={() => setImgPop(true)}
                />
              </div>
            ))}
          </div>
          {imgPop && (
                    <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-60 z-50 flex justify-between items-center gap-3">
                                    
                                            <a
            onClick={() => setImgPop(false)}
            className="absolute top-2 right-2 cursor-pointer"
          >
              <IconButton
                variant="text"
                color="blue-gray"
              >
              <XMarkIcon strokeWidth={2.5} className="h-5 w-5" style={{color:'white', height:'20px', width:'20px', backgroundColor:'red', borderRadius:'50%', padding:'1px'}} />
            </IconButton>
            </a>
          
          <a
            onClick={() => swipeImg("prv")}
            className="bg-[#087e94] rounded-full ml-2 hover:translate-x-2 transition-all ease-linear cursor-pointer"
          >
              <IconButton
                variant="text"
                color="blue-gray"
              >
              <ChevronLeftIcon strokeWidth={2.5} className="h-5 w-5" style={{color:'white', backgroundColor:'#087e94', borderRadius:'50%', padding:'1px', height:'30px', width:'30px'}} />
            </IconButton>
            </a>
            <div>
                            <img
                  className="w-full rounded-lg object-cover object-center "
                  src={story?.imagesUrls[selectedImg]}
                  alt="imageLink"
                  onClick={() => setImgPop(true)}
                />
          </div>
            <a
            onClick={() => swipeImg("nxt")}
            className="bg-[#087e94] rounded-full mr-2 hover:-translate-x-2 transition-all ease-linear cursor-pointer"
          >
              <IconButton
                variant="text"
                color="blue-gray"
              >
              <ChevronRightIcon strokeWidth={2.5} className="h-5 w-5" style={{color:'white', backgroundColor:'#087e94', borderRadius:'50%', padding:'1px', height:'30px', width:'30px'}} />
            </IconButton>
            </a>
                    </div>
          )}
    </div>
  )
}

export default StoryDetail