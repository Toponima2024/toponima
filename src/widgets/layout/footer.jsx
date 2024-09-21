import PropTypes from "prop-types";
import { Typography } from "@material-tailwind/react";
import { HeartIcon, Squares2X2Icon } from "@heroicons/react/24/solid";
import { Link } from 'react-router-dom';

export function Footer({ brandName, brandLink, routes }) {
  const year = new Date().getFullYear();

  return (
    <footer className="py-2">
      <div className="fixed bottom-0 left-0 z-50 w-full h-16 bg-white border-t border-gray-200 dark:bg-gray-700 dark:border-gray-600">
          <div className="grid h-full max-w-lg grid-cols-3 mx-auto font-medium">
            <Link to="/explore/home" className="flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group">
              <button type="button" className="flex flex-col items-center">
                <img src="/img/explore_home.svg"  alt="exploreImage" width={20} />
                <span style={{color:'#00000099', fontSize:'0.75rem'}}>Explore</span>
              </button>
            </Link>
            <Link to="/collections/home" className="flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group">
              <button type="button" className="flex flex-col items-center">
                <img src="/img/collections.svg"  alt="exploreImage" width={20} />
                <span style={{color:'#00000099', fontSize:'0.75rem'}} >Collections</span>
              </button>
            </Link>
            <Link to="/about/home" className="flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group">
              <button type="button" className="flex flex-col items-center">
                <img src="/img/about.svg"  alt="exploreImage" width={20} />
                <span style={{color:'#00000099', fontSize:'0.75rem'}} >About</span>
              </button>
            </Link>
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
