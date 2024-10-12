import PropTypes from "prop-types";
import { Typography } from "@material-tailwind/react";
import { HeartIcon, Squares2X2Icon } from "@heroicons/react/24/solid";
import { Link } from 'react-router-dom';

export function Footer({ brandName, brandLink, routes }) {
  const year = new Date().getFullYear();
  const textToponima =`Toponima is a cultural project that aims to promote creative and sustainable ways to explore and enjoy our city by 
delving into the stories behind placenames. The project supports local entrepreneurship and social economy by 
providing an advanced interactive digital platform for products and services and business network facilitators to help 
communities share their offerings globally.`;
const textCopy =`Copyright©2024 All Rights Reserved by Toponima and Empreintes Urbaines.Toponima is Developed by Felipe
Vargas.Graphic Design by Eugenia Esté. Text by Zoé Rochat and Cynthia Rodríguez. Illustrations by Eugenia Esté and 
Giovanni Tazza. Photography by Agustina Isidori`;


  return (
    <footer style={{backgroundColor:'#f1f1f1'}} className="bg-white bottom-0 w-full left-0 flex items-center justify-center shadow-lg mb-1 mt-5">
      <div className="w-4/5 mb-2">
        <div className="grid grid-cols-12 gap-2">
          <div className="col-span-12 flex items-center justify-center mt-2 space-x-20 ">
              <Link to="/explore/home">
                <button type="button" className="flex flex-col  items-center" style={{marginBottom:'5px'}}>
                        <img src="/img/explore_home.svg"  alt="exploreImage" width={20}  />
                        <span style={{color:'#00000099', fontSize:'0.75rem'}}>Explore</span>
                  </button>
              
              </Link>
              <Link to="/collections/home">
                <button type="button" className="flex flex-col items-center" style={{marginBottom:'5px'}}>
                        <img src="/img/collections.svg"  alt="exploreImage" width={20}  />
                        <span style={{color:'#00000099', fontSize:'0.75rem'}}>Collections</span>
                  </button>

              </Link>
              <Link to="/about/home">
                  <button type="button" className="flex flex-col items-center" style={{marginBottom:'5px'}}>
                        <img src="/img/about.svg"    alt="exploreImage" width={20}  />
                        <span style={{color:'#00000099', fontSize:'0.75rem'}}>About</span>
                  </button>
                </Link>
          </div>
          <div className="col-span-12 md:col-span-10" style={{color:'black'}}>
          <Typography className="font-ProximaNovaRegular" 
            style={{
              fontSize:'12px', 
              paddingLeft:'15px',
              paddingRight:'15px'
              }}>
            {textCopy}
          </Typography>
          </div>
          <div className="flex flex items-center justify-center col-span-12 md:col-span-2">
            <img src="/img/facebook.svg" height={25} width={25} alt="exploreImage" className="mr-4" />
            <img src="/img/instagram.svg" height={25} width={25}  alt="exploreImage" className="mr-4" />
            <img src="/img/x.svg" height={25} width={25}  alt="exploreImage" className="mr-4" />
          </div>
        </div>
      </div>
    </footer>
  );
}

Footer.defaultProps = {
  brandName: "Creative Tim",
  brandLink: "https://www.creative-tim.com",
  routes: [
    { name: "Creative Tim", path: "https://www.creative-tim.com" },
    { name: "About Us", path: "https://www.creative-tim.com/presentation" },
    { name: "Blog", path: "https://www.creative-tim.com/blog" },
    { name: "License", path: "https://www.creative-tim.com/license" },
  ],
};

Footer.propTypes = {
  brandName: PropTypes.string,
  brandLink: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object),
};

Footer.displayName = "/src/widgets/layout/footer.jsx";

export default Footer;
