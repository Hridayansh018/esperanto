import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import { getUserInfo } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";
import TravelStoryCard from "../../components/cards/TravelStoryCard";
import AddEditTravelStory from "./AddEditTravelStory";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "react-modal";
import { MdAdd } from "react-icons/md";
import ViewTravelStory from "./ViewTravelStory";

const Home = () => {
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();
  const [allStories, setAllStories] = useState([]);
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });
  const [searchQuery, setSearchQuery] = useState("");

  const [openViewModal, setOpenViewModal] = useState({
    isShown: false,
    data: null,
  });
  const [filter, setFilter] = useState("");

  // Fetch all travel stories

  const getAllStories = async () => {
    try {
      const response = await axiosInstance.get("/get-all-stories");
      if (response.data && response.data.stories) {
        const sortedStories = response.data.stories.sort(
          (a, b) => b.isFavourit - a.isFavourit
        );
        setAllStories(sortedStories);
      }
    } catch (error) {
      toast.error("Failed to fetch stories. Please try again later.");
      console.error("Error fetching stories:", error);
    }
  };

  // Toggle favorite status
  const updateIsFavorite = async (storyData) => {
    const storyId = storyData._id;
    try {
      const response = await axiosInstance.put(
        `/update-is-favourit/${storyId}`,
        { isFavourit: !storyData.isFavourit }
      );

      if (response.data.story) {
        toast.success("Favorite status updated!");
        getAllStories();
      }
    } catch (error) {
      toast.error("Failed to update favorite status.");
      console.error("Error updating favorite status:", error);
    }
  };

  // Handle view modal
  const handleViewStory = (data) => {
    setOpenViewModal({ isShown: true, data });
  };

  // Delete story
  const deleteStory = async (data) => {
    const storyId = data._id;

    try {
      const response = await axiosInstance.delete(`/delete-story/${storyId}`);
      if (response.data && !response.data.error) {
        toast.success("Story deleted successfully!");
        setOpenViewModal({ isShown: false, data: null });
        getAllStories();
      } else {
        toast.error("Failed to delete story. Please try again.");
      }
    } catch (error) {
      toast.error("An unexpected error occurred. Please try again later.");
      console.error("Error deleting story:", error);
    }
  };

  // Open edit modal
  const handleEdit = async (data) => {
    setOpenAddEditModal({ isShown: true, type: "edit", data });
  };

  const onSearchStory = async (query) => {
    try{
      const response = await axiosInstance.get("/search",{
        params : {
          query,
        },
      })

      if (response.data && response.data.stories){
        setFilter("search")
        setAllStories(response.data.stories);
      }
    } catch (error){
      console.log("An unexpected error occurred. Please try again");
      
    }
  }

  const handleClearSearch =() => {

  }

  useEffect(() => {
    getUserInfo(setUserInfo, navigate);
    getAllStories();
  }, [navigate]);

  return (
    <div className="items-center justify-between">
      <Navbar userInfo={userInfo}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearch={onSearchStory}
        handleClearSearch={handleClearSearch} />
      <div className="container mx-auto py-10">
        <div className="flex gap-10 items-center justify-center">
          <div className="flex-1">
            {allStories.length > 0 ? (
              <div className="grid grid-cols-2 gap-4">
                {allStories.map((item) => (
                  <TravelStoryCard
                    key={item._id}
                    imgUrl={item.imageUrl || "https://via.placeholder.com/150"}
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
          <div className="w-[320px]">{/* Additional sidebar content */}</div>
        </div>
      </div>

      {/* Add/Edit Travel Story Modal */}
      <Modal
        isOpen={openAddEditModal.isShown}
        onRequestClose={() =>
          setOpenAddEditModal({ isShown: false, type: "add", data: null })
        }
        style={{ overlay: { backgroundColor: "rgba(0,0,0,0.2)", zIndex: 999 } }}
        appElement={document.getElementById("root")}
        className="model-box"
      >
        <AddEditTravelStory
          type={openAddEditModal.type}
          storyInfo={openAddEditModal.data}
          onClose={() =>
            setOpenAddEditModal({ isShown: false, type: "add", data: null })
          }
          getAllStories={getAllStories} // Fixed to call getAllStories
        />
      </Modal>

      {/* View Travel Story Modal */}
      <Modal
        isOpen={openViewModal.isShown}
        onRequestClose={() => setOpenViewModal({ isShown: false, data: null })}
        style={{ overlay: { backgroundColor: "rgba(0,0,0,0.2)", zIndex: 999 } }}
        appElement={document.getElementById("root")}
        className="model-box"
      >
        <ViewTravelStory
          storyInfo={openViewModal.data}
          onClose={() => setOpenViewModal({ isShown: false, data: null })}
          onEditClick={() => {
            setOpenViewModal({ isShown: false, data: null });
            handleEdit(openViewModal.data || null);
          }}
          onDeleteClick={() => deleteStory(openViewModal.data || null)}
        />
      </Modal>

      {/* Add Story Button */}
      <button
        className="w-16 h-16 flex items-center rounded-full bg-blue-400 hover:bg-cyan-400 fixed right-10 bottom-10 justify-center"
        onClick={() =>
          setOpenAddEditModal({ isShown: true, type: "add", data: null })
        }
      >
        <MdAdd className="text-[50px] text-white items-center" />
      </button>

      <ToastContainer />
    </div>
  );
};

export default Home;
