import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Estilos del editor
import { Input, Button } from "@material-tailwind/react";
import MultiSelectWithChips from "./MultiSelectWithChips";
import { doc, updateDoc, collection, setDoc } from "firebase/firestore";
import MapView from "./map";

const LocationForm = ({ recordToEdit }) => {
     const { control, handleSubmit } = useForm({
       defaultValues: recordToEdit || {
        latitude: "",
        longitude: "",
       },
     });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [positions, setPositions] = useState([]);

    useEffect(() => {
      if(recordToEdit) {
        setPositions([
          {
            location: {
                _lat: recordToEdit.latitude,
                _long: recordToEdit.longitude,
            },
            title: recordToEdit.toponym,
            marker: recordToEdit.marker,
            mainImage: recordToEdit.mainImage,
            id: recordToEdit.id,
          },
        ]);
      }
    }, [recordToEdit])
    
  
    // Función para manejar la subida de imágenes
  //   const handleImageUpload = async (files) => {
  //     const uploadedImages = [];
  //     for (const file of files) {
  //       const imageRef = ref(storage, `images/${uuidv4()}_${file.name}`);
  //       await uploadBytes(imageRef, file);
  //       const downloadURL = await getDownloadURL(imageRef);
  //       uploadedImages.push(downloadURL);
  //     }
  //     setImages((prev) => [...prev, ...uploadedImages]);
  //   };
  
    // Función para guardar o editar el registro
    const onSubmit = async (data) => {
        console.log("data", data);
        setIsSubmitting(false);
    };
  

  
    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Campo de título */}
  
        <div className="grid grid-cols-4 gap-4">
          <div className="col-span-1 ">
          <hr className="my-4" />
              <Controller
              name="latitude"
              control={control}
              render={({ field }) => <Input label="Latitude" readOnly {...field} type="text" required /> }
              />
              <hr className="my-4" />
            <Controller
              name="longitude"
              control={control}
              render={({ field }) => <Input label="Longitude"  readOnly {...field} type="text" required /> }
              />
          </div>
          <div className="col-span-3">
          {
        positions.length >0 && (<MapView positions={positions}/>)
        // JSON.stringify(positions) 
      }
            </div>
      </div>
 
  
        {/* Subida de imágenes */}
  
        {/* Botón de enviar */}
        <Button type="submit" size="sm"  ripple={true} disabled={isSubmitting}>
          {isSubmitting ? "Guardando..." : recordToEdit ? "Actualizar" : "Crear"}
        </Button>
      </form>
    );
  };
  
  export default LocationForm;