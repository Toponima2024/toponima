import React from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {  Link } from "react-router-dom";

import {
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Button,
  IconButton,
  Switch,
  Typography,
  Chip,
  Card,
} from "@material-tailwind/react";
import {
  useMaterialTailwindController,
  setOpenConfigurator,
  setSidenavColor,
  setSidenavType,
  setFixedNavbar,
} from "@/context";

// className="rounded-none py-1.5 px-3 text-sm font-normal text-blue-gray-700 hover:bg-blue-500 hover:text-white focus:bg-blue-500 focus:text-white"

function formatNumber(number, decPlaces) {
  decPlaces = Math.pow(10, decPlaces);

  const abbrev = ["K", "M", "B", "T"];

  for (let i = abbrev.length - 1; i >= 0; i--) {
    var size = Math.pow(10, (i + 1) * 3);

    if (size <= number) {
      number = Math.round((number * decPlaces) / size) / decPlaces;

      if (number == 1000 && i < abbrev.length - 1) {
        number = 1;
        i++;
      }

      number += abbrev[i];

      break;
    }
  }

  return number;
}

export function Configurator() {
  const [controller, dispatch] = useMaterialTailwindController();
  const { openConfigurator, sidenavColor, sidenavType, fixedNavbar } =
    controller;
  const [stars, setStars] = React.useState(0);

  const sidenavColors = {
    white: "from-gray-100 to-gray-100 border-gray-200",
    dark: "from-black to-black border-gray-200",
    green: "from-green-400 to-green-600",
    orange: "from-orange-400 to-orange-600",
    red: "from-red-400 to-red-600",
    pink: "from-pink-400 to-pink-600", 
  };

  React.useEffect(() => {
    const stars = fetch(
      "https://api.github.com/repos/creativetimofficial/material-tailwind-dashboard-react"
    )
      .then((response) => response.json())
      .then((data) => setStars(formatNumber(data.stargazers_count, 1)));
  }, []);

  return (
    <aside
      className={`fixed top-0 right-0 z-50 h-screen w-96 bg-customBg px-2.5 shadow-lg transition-transform duration-300 ${
        openConfigurator ? "translate-x-0" : "translate-x-96"
      }`}
    >
      <div className="flex items-start justify-between px-6 pt-8 pb-6">
        <div>
        <img src="/img/logo.png" className="w-full sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/2 max-w-full h-auto" alt="Logo" />        
        </div>
        <IconButton
          variant="text"
          color="blue-gray"
          onClick={() => setOpenConfigurator(dispatch, false)}
        >
          <XMarkIcon strokeWidth={2.5} className="h-5 w-5" />
        </IconButton>
      </div>      
      <Card className="w-96 overflow-hidden rounded-md bg-customBg">
      <List className="my-2 p-0">
      <Link to="/explore/home" onClick={() => setOpenConfigurator(dispatch, false)}>
        <ListItem >
          <ListItemPrefix>
            <img src="/img/explore_home.svg"  alt="exploreImage" width={20} />
          </ListItemPrefix>
          Explore
        </ListItem>
      </Link>
      <Link to="/collections/home"  onClick={() => setOpenConfigurator(dispatch, false)}>
        <ListItem>
          <ListItemPrefix>
            <img src="/img/collections.svg"  alt="exploreImage" width={20} />
          </ListItemPrefix>
          Collections
        </ListItem>
      </Link>
      <Link to="/about/home"  onClick={() => setOpenConfigurator(dispatch, false)}>
        <ListItem >
          <ListItemPrefix>
            <img src="/img/about.svg"  alt="exploreImage" width={20} />
          </ListItemPrefix>
          About
        </ListItem>
      </Link>
      <ListItem >
          Terms of Use
      </ListItem>
      <ListItem >
          Privacy Policy
      </ListItem>
      <ListItem >
        Copyright Policy
      </ListItem>
      </List>
    </Card>    
    <div className="flex items-center justify-start px-6 pt-8 pb-6">
      <img src="/img/facebook.svg" height={25} width={25} alt="exploreImage" className="mr-4" />
      <img src="/img/instagram.svg" height={25} width={25}  alt="exploreImage" className="mr-4" />
      <img src="/img/x.svg" height={25} width={25}  alt="exploreImage" className="mr-4" />
    </div>
    </aside>
  );
}

Configurator.displayName = "/src/widgets/layout/configurator.jsx";

export default Configurator;
