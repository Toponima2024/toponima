
import { useState, useEffect } from "react";
import { auth, db } from "../../fb";       
import { collection, query, orderBy, limit, startAfter, getDocs, deleteDoc, doc } from "firebase/firestore";
import { PencilIcon } from "@heroicons/react/24/solid";
import {
  UserPlusIcon ,
  ChevronUpDownIcon ,
  ArrowRightOnRectangleIcon,
  MagnifyingGlassIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { Button, Typography, Card, CardBody, CardFooter, CardHeader, Avatar , Tooltip , IconButton, Dialog , DialogHeader, DialogBody, DialogFooter } from "@material-tailwind/react";
import EditStory from "../explore/editstory";
import { useAuth } from "@/context/auth/AuthContext";

export function StoryList() {
    const [stories, setStories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [lastVisible, setLastVisible] = useState(null);
    const [hasMore, setHasMore] = useState(true);
    const [initialLoad, setInitialLoad] = useState(false);
    const [open, setOpen] = useState(false);
    const [selectedId, setselectedId] = useState(null);
    const { user , loading: loadingAuth } = useAuth();

    const fetchStories = async (startAfterDoc = null) => {     
      console.log("fetching stories", startAfterDoc);
      if(!startAfterDoc){
        setStories([]);
      }
      setLoading(true);
      const storiesQuery = query(
        collection(db, "story"),
        orderBy("createdAt"), // Asegúrate de tener un campo "createdAt" en tus documentos
        limit(10),
        ...(startAfterDoc ? [startAfter(startAfterDoc)] : [])
      );
      const querySnapshot = await getDocs(storiesQuery);
      console.log("querySnapshot.docs.length", querySnapshot.docs.length);
      const newStories = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      if (querySnapshot.docs.length < 10) {
        setHasMore(false);
      }
      setStories((prevStories) => {
        const uniqueNewStories = newStories.filter(
          (newStory) => !prevStories.some((story) => story.id === newStory.id)
        );
        return [...prevStories, ...uniqueNewStories];
      });
      setLastVisible(querySnapshot.docs[querySnapshot.docs.length -1]);
      setLoading(false);
    }

    const handleDelete = async (id) => {
      await deleteDoc(doc(db, "story", id));
      setStories((prevStories) => prevStories.filter((story) => story.id !== id));
    };
    useEffect(() => {
      if (!initialLoad) {
        setStories([]);
        fetchStories();
        setInitialLoad(true);
      }
    }, [initialLoad]);

    useEffect(() => {
      console.log("user StoryList", user);
      if(!loadingAuth && !user) {
        window.location.href = "/auth/sign-in"; // Replace "/dashboard" with the desired path
      }
    }, [loadingAuth, user]);

    const TABLE_HEAD = [ "Title", "Actions"];
    const handleOpen = () => setOpen(!open);

    // if(!user) {
    //   window.location.href = "/auth/sign-in"; // Replace "/dashboard" with the desired path
    // }
    const handleLogOut = async () => {
      await auth.signOut();
      window.location.href = "/auth/sign-in"; // Replace "/dashboard" with the desired path
    }

  return (
    <section className="m-8 flex">
          <div className="container mx-auto">
          <Card className="h-full w-full">
            <CardHeader floated={false} shadow={false} className="rounded-none">
              <div className="mb-8 flex items-center justify-between gap-8">
                <div>
                  <Typography variant="h5" color="blue-gray">
                    Toponym History
                  </Typography>
                </div>
                <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                  <Button className="flex items-center gap-3" size="sm">
                    <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Add Story
                  </Button>
                  <Button className="flex items-center gap-3" size="sm" onClick={handleLogOut}>
                    <ArrowRightOnRectangleIcon strokeWidth={2} className="h-4 w-4" /> Log Out
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardBody className="overflow-scroll px-0">
              <table className="mt-4 w-full min-w-max table-auto text-left">
                <thead>
                  <tr>
                    {TABLE_HEAD.map((head, index) => (
                      <th
                        key={head}
                        className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
                      >
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                        >
                          {head}{" "}
                          {/* {index !== TABLE_HEAD.length - 1 && (
                            <ChevronUpDownIcon strokeWidth={2} className="h-4 w-4" />
                          )} */}
                        </Typography>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {stories.map(
                    ({ id, mainImage, title }, index) => {
                      const isLast = index === stories.length - 1;
                      const classes = isLast
                        ? "p-4"
                        : "p-4 border-b border-blue-gray-50";
      
                      return (
                        <tr key={id}>
                          <td className={classes}>
                            <div className="flex items-center gap-3">
                              <Avatar src={mainImage} alt={title} size="sm" />
                              <div className="flex flex-col">
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-normal"
                                >
                                  {title}
                                </Typography>
                              </div>
                            </div>
                          </td>
                          <td className={classes}>
                            <Tooltip content="Edit Story">
                              <IconButton variant="text">
                                <PencilIcon className="h-4 w-4" onClick={()=> {
                                  setselectedId(id);
                                  setOpen(true);
                                }} />
                              </IconButton>
                            </Tooltip>
                            <Tooltip content="View Story">
                              <IconButton variant="text">
                                <MagnifyingGlassIcon className="h-4 w-4" />
                              </IconButton>
                            </Tooltip>
                            <Tooltip content="Delete Story">
                              <IconButton variant="text">
                                <TrashIcon className="h-4 w-4" />
                              </IconButton>
                            </Tooltip>
                            
                          </td>
                        </tr>
                      );
                    },
                  )}
                </tbody>
              </table>
            </CardBody>
            <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
              <Typography variant="small" color="blue-gray" className="font-normal">
                Page 1 of 10
              </Typography>
              <div className="flex gap-2">
                <Button variant="outlined" size="sm">
                  Previous
                </Button>
                <Button variant="outlined" size="sm">
                  Next
                </Button>
              </div>
            </CardFooter>
          </Card>
    </div>
    {/* <div className="container mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stories.map((story) => (
          <Card key={story.id} className="mb-4">
          <CardHeader color="blue-gray" className="relative h-56">
              <img
                src={story.mainImage}
                alt="card-image"
              />
          </CardHeader>
            <CardBody>
              <Typography variant="h5" className="mb-2">{story.title}</Typography>
              <Typography>{story.id}</Typography>
            </CardBody>
            <CardFooter className="flex justify-between">
              <Link to={`/explore/story/${story.id}`}>
                <Button size="sm">View</Button>
              </Link>
              <Link to={`/explore/edit/${story.id}`}>
                <Button size="sm" color="blue">Edit</Button>
              </Link>
              <Button size="sm" color="red" onClick={() => handleDelete(story.id)}>Delete</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      {loading && <Typography>Loading...</Typography>}
      {hasMore && (
          <Button onClick={() => fetchStories(lastVisible)} disabled={loading}>
            Load More
          </Button>
        )}
    </div> */}
      <Dialog open={open} handler={handleOpen} size="xxl">
        <DialogHeader>Toponym Histroies</DialogHeader>
        <DialogBody>
          <EditStory id={selectedId}/>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" onClick={handleOpen}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </section>
  );
}

export default StoryList;
