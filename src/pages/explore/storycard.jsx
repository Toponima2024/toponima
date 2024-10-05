import { 
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Avatar,
    Tooltip
} from '@material-tailwind/react'
import React from 'react'

function StoryCard({story, collectionCatalog}) {

const getColorTag = (tag) => {
    const colorTagInfo = collectionCatalog.filter((collection) => collection.title === tag);
    
    return colorTagInfo.length ? colorTagInfo[0].color : 'red';
    }
  return (
        <Card className="overflow-hidden">
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="m-0 rounded-none"
          >
            <img
              src={story.mainImage}
              alt="ui/ux review check"
            />
          </CardHeader>
          <CardBody  style={{padding:'0px'}}>
            <div className="flex items-center">
              <Avatar
                  size="sm"
                  variant="circular"
                  alt="Toponima Team"
                  src={story.marker}
                  className="border-2 border-white hover:z-10 p-1"
                />
            <Typography color="blue-gray" className='font-ProximaNovaBold'>
              {story.toponym}
            </Typography>
            </div>
            <Typography className="mt-3 font-ProximaNovaRegular ml-2">
            {story.shortdescription}
            </Typography>
          </CardBody>
          <CardFooter className="flex items-center justify-between"  style={{padding:'0px'}}>
            <div className="flex items-center">
              <Tooltip content="Toponima Team">
                <button className="rounded-md bg-gradient-to-tr from-slate-800 to-slate-700 p-2.5 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button">
                  <Avatar
                    size="sm"
                    variant="circular"
                    alt="Toponima Team"
                    src="/img/toponima_icon.svg"
                    className="border-2 border-white hover:z-10  bg-[#5bafc5] p-1"
                  />
                </button>
              </Tooltip>
              {
              story.tags.map(tag => (
                <span key={tag} style={{backgroundColor: getColorTag(tag), marginRight:'5px'}} 
                className="rounded-md py-0.5 px-2.5 border border-transparent text-sm text-white transition-all shadow-sm font-FreightTextProBoldRegular">
                  
                  {tag}
                </span>
              ))
            }
            </div>
          </CardFooter>
        </Card>
  )                
}

export default StoryCard