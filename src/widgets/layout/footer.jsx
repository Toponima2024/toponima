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
    <footer className="bg-white bottom-0 w-full flex items-center justify-center shadow-lg p-5 mt-5">
      <div className="w-4/5 ">
        <div className="grid grid-cols-12 gap-2">
          <div className="col-span-10" style={{color:'black'}}>
          <Typography className="font-ProximaNovaRegular" 
            style={{
              fontSize:'12px',
              paddingLeft:'15px',
              paddingRight:'15px'
              }}>
            {textToponima}
          </Typography>
          </div>
          <div className="col-span-2">
            <ul>
              <li>
                <Link to="/about/home">
                  <button type="button" className="flex items-center" style={{marginBottom:'5px'}}>
                        <img src="/img/about.svg"    alt="exploreImage" width={10}  />
                        <span style={{color:'#00000099', fontSize:'0.75rem', marginLeft:'5px'}}>About</span>
                  </button>
                </Link></li>
              <li><Link to="/explore/home">
                <button type="button" className="flex items-center" style={{marginBottom:'5px'}}>
                        <img src="/img/explore_home.svg"  alt="exploreImage" width={10}  />
                        <span style={{color:'#00000099', fontSize:'0.75rem', marginLeft:'5px'}}>Explore</span>
                  </button>
              
              </Link></li>
              <li><Link to="/collections/home">
                <button type="button" className="flex items-center" style={{marginBottom:'5px'}}>
                        <img src="/img/collections.svg"  alt="exploreImage" width={10}  />
                        <span style={{color:'#00000099', fontSize:'0.75rem', marginLeft:'5px'}}>Collections</span>
                  </button>

              </Link></li>
            </ul>
          </div>
          <div style={{paddingLeft:'10%', paddingRight:'10%'}} className="col-span-12" >
            <hr  className="border-t-4 border-gray-400" />
          </div>
          <div className="col-span-10" style={{color:'black'}}>
          <Typography className="font-ProximaNovaRegular" 
            style={{
              fontSize:'12px', 
              paddingLeft:'15px',
              paddingRight:'15px'
              }}>
            {textCopy}
          </Typography>
          </div>
          <div className="flex flex items-center justify-center col-span-2">
            <img src="/img/icons8-facebook-48.png"  alt="exploreImage" className="mr-4" />
            <img src="/img/icons8-instagram-48.png"  alt="exploreImage" className="mr-4" />
            <img src="/img/icons8-twitterx-48.png"  alt="exploreImage" className="mr-4" />
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
