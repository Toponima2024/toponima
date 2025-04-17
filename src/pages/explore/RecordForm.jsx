import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Estilos del editor
import { Input, Button } from "@material-tailwind/react";
import MultiSelectWithChips from "./MultiSelectWithChips";
import { doc, updateDoc, collection, setDoc } from "firebase/firestore";

 import { db, storage } from "../../fb"; // Asegúrate de exportar storage en tu archivo firebase.js
// import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
// import { v4 as uuidv4 } from "uuid"; // Para generar IDs únicos para las imágenes



const RecordForm = ({ recordToEdit, collections }) => {
  const { control, handleSubmit, setValue, values, reset } = useForm({
    defaultValues: recordToEdit || {
      title: "",
      shortdescription: "",
      description: "",
      tags:[],
    },
  });



  const [images, setImages] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
     setIsSubmitting(true);
     try {
       const recordData = {
        ...data,
         tags: recordToEdit.tags, // Asociar las imágenes subidas al registro
       };

       if (recordToEdit) {
    //     // Editar registro existente
         const recordRef = doc(db, "story", recordToEdit.id);
         await updateDoc(recordRef, recordData);

       } else {
         // Crear nuevo registro
         const recordRef = doc(collection(db, "story"));
         await setDoc(recordRef, { ...recordData, id: recordRef.id });
       }

       //reset(); // Limpiar el formulario
       setImages([]); // Limpiar las imágenes
       alert(recordToEdit ? "Registro actualizado" : "Registro creado");
       recordToEdit = {
        title: recordData.title,
        shortdescription: recordData.shortdescription,
        description: recordData.description,
        tags:recordData.tags,
     }
     } catch (error) {
       console.error("Error al guardar el registro:", error);
       alert("Hubo un error al guardar el registro");
     } finally {
       setIsSubmitting(false);
    console.log(data);
    console.log('recordToEdit.tags',recordToEdit.tags);
     }
  };

  const setTags = (tags) => {
    setValue('tags', tags);
    recordToEdit.tags = tags;
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Campo de título */}

      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-3">
            <Controller
            name="title"
            control={control}
            render={({ field }) => <Input label="Title" {...field} type="text" required /> }
            />
        </div>
        <div className="col-span-3">
            <Controller
            name="shortdescription"
            control={control}
            render={({ field }) => <Input label="Short Description" {...field} type="text" required /> }
            />
        </div>
        <div  className="col-span-3">
        <label>Tags</label>
        <MultiSelectWithChips 
            control={control} 
            name="tags" 
            collections={collections} 
            defaultValues={recordToEdit.tags}
            setTags={setTags}
            />
        </div>
        <div className="col-span-3">
        <label>Description</label>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <ReactQuill
              {...field}
              theme="snow"
              onChange={(value) => field.onChange(value)}
            />
          )}
        />
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

export default RecordForm;