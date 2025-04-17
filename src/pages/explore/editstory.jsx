import React, { useEffect, useState } from 'react'
import {
  Square3Stack3DIcon,
  MapPinIcon,
  GifIcon,
  EyeIcon,
  XMarkIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from "@heroicons/react/24/solid";
import { doc, getDoc, getDocs, collection  } from "firebase/firestore";
import { db } from "../../fb";       
import { useParams } from 'react-router-dom';

import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
  IconButton
} from "@material-tailwind/react";
import {  Link } from "react-router-dom";
import ExpandableContent from './expandablecontent';
import LoadingSpinner from '@/widgets/loading/LoadingSpinner';
import RecordForm from './RecordForm';


function EditStory({id}) {
    const [story, setStory] = useState();
    const [selectedImg, setSelectedImg] = useState(0);
    const [recordToEdit, setRecordToEdit] = useState(null);
    const [collections, setCollections] = useState([])

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

    const InfoTab = ({ story, collections }) => (
      <div>
        <RecordForm recordToEdit={{
          id: story.id,
          title: story.title,
          description: story.description,
          shortdescription: story.shortdescription,
          tags: story.tags,
        } } collections={collections} />
      </div>
    );
    
    const LocationsTab = ({ story }) => (
      <div>
        <h2>Locations</h2>
        <p>Locations content here...</p>
      </div>
    );
    
    const ImagesTab = ({ story }) => (
      <div>
        <h2>Images</h2>
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
        <div>
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
      </div>
    );
    
    const PreviewTab = ({ story }) => (
      <div>
        <h2>Preview</h2>
        <p>Preview content here...</p>
      </div>
    );

    const data = [
      {
        label: "Info",
        value: "info",
        icon: Square3Stack3DIcon,
        component: InfoTab,
      },
      {
        label: "Locations",
        value: "locations",
        icon: MapPinIcon,
        component: LocationsTab,
      },
      {
        label: "Images",
        value: "images",
        icon: GifIcon,
        component: ImagesTab,

      },
      {
        label: "Preview",
        value: "preview",
        icon: EyeIcon,
        component: PreviewTab,
      },
    ];
    const fetchStory = async ( id ) => { 
        try {
          console.log("Fetching document with ID:", id);
            const docRef = doc(db, "story", id);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const data = { ...docSnap.data(), id: docSnap.id };
                console.log("Document data:", data);
                setStory(data);
               // setIsLoading(false);
               setRecordToEdit({
                id: data.id,
                title: data.title,  
                description: data.description,
                tags: data.tags,
               })
              } else {
                console.log("No such document!");
              }
        } catch (error) {
            console.error("Error fetching document: ", error);
            // setIsLoading(false);
        }
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
      console.log("Fetching story with ID:", id);
        fetchStory(id);
        fetchCollections();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [id])
  
  if(!story) return <LoadingSpinner />  

  return (
    <div style={{marginBottom:'25px'}} className="container mx-auto ">
      <Tabs value="info">
        <TabsHeader>
          {data.map(({ label, value, icon }) => (
            <Tab key={value} value={value}>
              <div className="flex items-center gap-2">
                {React.createElement(icon, { className: "w-5 h-5" })}
                {label}
              </div>
            </Tab>
          ))}
        </TabsHeader>
        <TabsBody>
          {data.map(({ value, component: Component  }) => (
            <TabPanel key={value} value={value}>
              <Component story={story} collections={collections} />
            </TabPanel>
          ))}
        </TabsBody>
      </Tabs>

    </div>
  )
}

export default EditStory