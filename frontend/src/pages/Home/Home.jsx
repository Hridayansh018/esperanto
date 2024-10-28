import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import { getUserInfo } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";
import TravelStoryCard from "../../components/cards/TravelStoryCard";

const Home = () => {
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();
  const [allStories, setAllStories] = useState([]);

  

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
    </div>
  );
};

export default Home;
