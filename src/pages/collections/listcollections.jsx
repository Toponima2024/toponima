import React from 'react'

import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
  } from "@material-tailwind/react";

function ListCollections({ collections }) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mb-5">
        {
        collections.map((collection, index) => (
            <Card className="w-85" key={index}>
            <CardHeader shadow={false} floated={false}>
              <img
                src={collection.imgUrl}
                alt="card-image"
                className="h-full w-full object-contain"
              />
            </CardHeader>
            <CardBody>
              <div className="mb-2 flex items-center justify-between">
                <Typography color="blue-gray" className="font-medium">
                  {collection.title}
                </Typography>
                <Typography color="blue-gray" className="font-medium">
                  
                </Typography>
              </div>
              <Typography
                variant="small"
                color="gray"
                className="font-normal opacity-75"
              >
                {collection.content}
              </Typography>
            </CardBody>
          </Card>
        ))
     }    
    </div>
  )
}

export default ListCollections