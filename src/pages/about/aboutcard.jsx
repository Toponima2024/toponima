import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
    Tooltip,
    IconButton,
  } from "@material-tailwind/react";

  const aboutInfoCards = [
    {
        id:1,
        title: "A toponym is the name by which a geographical place is known. Topo means place and nym stands for name. A toponym, therefore, is a name for a place. Naming places is important to organize our way and destination.",
        imgUrl: "/img/toponyma_def.png"    
      },
    {
        id:2,
        title: "A place name provides information about the past and present of a city: personalities, geographical names or places, historical events and institutions, crafts and trade of importance to a city development, etc.",
        imgUrl: "/img/toponym_def.png"
    },
    {
        id:3,
        title: "Place names are a source of meaningful content to teach history, cultural heritage, urban patterns, storytelling, literature, and geography. Pinpointing toponyms on the map is a playful way to create imaginary trips, reenact historical events and characters, write stories and biographies, and so on.",
        imgUrl: "/img/use_for_school.png"
    },
    {
        id:4,
        title: "Place names are a great way to find inspiration in crafts and commerce historically important for the development of the city to link the business brand to its past. In short, pinpoint your business on the map and tell us your story brand.",
        imgUrl: "/img/use_for_business.png"
    },
    {
        id:5,
        title: "Place names serve as tools to create attractive content for tourists and investors, and to strengthen the local identity of residents.",
        imgUrl: "/img/city_branding.png"        
    },
    {
        id:6,
        title: "Place names play a vital role in preserving cultural diversity, serving as markers for understanding differences and promoting inclusion.",
        imgUrl: "/img/community.png"
    }
  ];
   
  export function AboutCard({id}) {
    const cardInfo = aboutInfoCards.find((card) => card.id === id);
    return (
      <Card className="w-full max-w-[26rem] shadow-lg">
        <CardHeader floated={false} color="blue-gray">
          <img
            src={cardInfo.imgUrl}
            alt="ui/ux review check"
          />
          <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60 " />
        </CardHeader>
        <CardBody>
          <Typography className="font-ProximaNovaRegular" style={{fontSize:'16px', lineHeight:'1.5'}}>
            {cardInfo.title}
          </Typography>
        </CardBody>
      </Card>
    );
  }
  