import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import { getUserInfo } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";
import TravelStoryCard from "../../components/cards/TravelStoryCard";
import AddEditTravelStory from "./AddEditTravelStory";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from "react-modal"
import {MdAdd} from "react-icons/md"


const Home = () => {
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();
  const [allStories, setAllStories] = useState([]);
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });
  

  const getAllStories = async () => {
    try {
      const response = await axiosInstance.get("/get-all-stories");
      if (response.data && response.data.stories) {
        const sortedStories = response.data.stories.sort((a, b) => b.isFavourit - a.isFavourit);
        setAllStories(sortedStories);
      }
    } catch (error) {
      console.log("An unexpected error occurred", error);
    }
  };

  const updateIsFavorite = async (storyData) => {
    const storyId = storyData._id;
    try {
      const response = await axiosInstance.put(`/update-is-favourit/${storyId}`, {
        isFavourit: !storyData.isFavourit,
      });

      if (response.data.story) {
        getAllStories(response.data.story)
      }
    } catch (error) {
      console.log("An unexpected error occurred", error);
    }
  };

  //handelviewstory
  const handleViewStory = () =>{

  }

  useEffect(() => {
    getUserInfo(setUserInfo, navigate);
    getAllStories();
  }, [navigate]);

  return (
    <div className="items-center justify-between">
      <Navbar userInfo={userInfo} />
      <div className="container mx-auto py-10">
        <div className="flex gap-10 items-center justify-center">
          <div className="flex-1">
            {allStories.length > 0 ? (
              <div className="grid grid-cols-2 gap-4">
                {allStories.map((item) => (
                  <TravelStoryCard
                    key={item._id}
                    imgUrl={item.imageUrl || "https://via.placeholder.com/150"} // Fallback image URL
                    title={item.title}
                    story={item.story}
                    createdOn={item.createdOn}
                    visitedDate={item.visitedDate}
                    visitedLocation={item.visitedLocation}
                    isFavourit={item.isFavourit}
                    onClick={() => handleViewStory(item)}
                    onFavouriteClick={() => updateIsFavorite(item)}
                  />
                ))}
              </div>
            ) : (
              <p>No stories available</p>
            )}
          </div>
          <div className="w-[320px]">
            {/* Additional sidebar content */}
          </div>
        </div>
      </div>

      {/*add and edit travel story model*/}

      <Modal 
      isOpen={openAddEditModal.isShown}
      onRequestClose={()=>{}}
      style={{overlay:{
        backgroundColor:"rgba(0,0,0,0.2)",
        zIndex: 999,
        }
      }}
      appElement={document.getElementById('root')}
      className="model-box"
      >
        <AddEditTravelStory 
        type={openAddEditModal.type}
        storyInfo={openAddEditModal.data}
        onClose={()=>{
          setOpenAddEditModal({ isShown:false, type:"add", data:null });
        }}
        />
      </Modal>

      <button className="w-16 h-16 flex items-center rounded-full bg-blue-400 hover:bg-cyan-400 fixed right-10 bottom-10 justify-center"
      onClick={()=>{
        setOpenAddEditModal({ isShown:true, type:"add", data:null });
      }}>

        <MdAdd className="text-[50px] text-white items-center" />

      </button>

      <ToastContainer />  

    </div>
  );
};

export default Home;
