import React from 'react'
import {  doc, getDoc } from "firebase/firestore";
import { db } from '../../fb';
import { useParams } from 'react-router-dom';

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
                setIsLoading(false);
              } else {
                console.log("No such document!");
              }
        } catch (error) {
            console.error("Error fetching document: ", error);
            setIsLoading(false);
        }
      }


  return (
    <div>{id}storydetail</div>
  )
}

export default StoryDetail