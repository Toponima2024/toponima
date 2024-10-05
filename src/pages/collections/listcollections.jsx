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
              <div className="mb-2 text-center">
                <div 
                  className="rounded-md py-0.5 px-2.5 border border-transparent text-sm text-white transition-all shadow-sm font-FreightTextProBoldRegular"
                  style={{backgroundColor: collection.color}}
                >
                  {collection.title}
                </div>
              </div>
              <Typography
                variant="small"
                className="text-center font-ProximaNovaRegular"
                style={{fontSize: '1rem'}}
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