import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  InformationCircleIcon,
  ServerStackIcon,
  RectangleStackIcon,
} from "@heroicons/react/24/solid";
import { Home, Profile, Tables, Notifications } from "@/pages/explore";
import { SignIn, SignUp } from "@/pages/auth";
import { HomeCollection } from "@/pages/collections";
import { HomeAbout } from "@/pages/about";
import StoryDetail from "./pages/explore/storydetail";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    layout: "explore",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "explore",
        path: "/home",
        element: <Home />,
      },
      {
        icon: <UserCircleIcon {...icon} />,
        name: "profile",
        path: "/profile",
        element: <Profile />,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "tables",
        path: "/tables",
        element: <Tables />,
      },
      {
        icon: <InformationCircleIcon {...icon} />,
        name: "story detail",
        path: "/story/:id",
        element: <StoryDetail />,
      },
    ],
  },
  {
    title: "auth pages",
    layout: "auth",
    pages: [
      {
        icon: <ServerStackIcon {...icon} />,
        name: "sign in",
        path: "/sign-in",
        element: <SignIn />,
      },
      {
        icon: <RectangleStackIcon {...icon} />,
        name: "sign up",
        path: "/sign-up",
        element: <SignUp />,
      },
    ],
  },
  {
    layout: "collections",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "collections",
        path: "/home",
        element: <HomeCollection />,
      },
    ],
  },
  {
    layout: "about",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "about",
        path: "/home",
        element: <HomeAbout />,
      },
    ],
  },
];

export default routes;
