//AddEditTravelStory
import { MdAdd, MdClose, MdUpdate } from "react-icons/md";
import DateSelector from "../../components/input/DateSelector";
import { useState } from "react";
import ImageSelector from "../../components/input/ImageSelector";
import TagInput from "../../components/input/TagInput";
import axiosInstance from "../../utils/axiosInstance";
import moment from "moment";
import { toast } from "react-toastify";
import uploadImage from "../../utils/uploadImage";


const AddEditTravelStory = ({
  storyInfo,
  type,
  onClose,
  getAllStories
}) => {
  const [visitedDate, setVisitedDate] = useState(storyInfo?.visitedDate || null);
  const [visitedLocation, setVisitedLocation] = useState(storyInfo?.visitedLocation || []);
  const [title, setTitle] = useState(storyInfo?.title || '');
  const [storyImg, setStoryImg] = useState(storyInfo?.imageUrl || null);
  const [story, setStory] = useState(storyInfo?.story || '');
  const [error, setError] = useState("");


  const updateTravelStory = async () => {
    try {
      const storyId = storyInfo._id;
      let imageUrl = "";

      //upload image if present
      if (storyImg) {
        try {
          const imgUploadRes = await uploadImage(storyImg);
          imageUrl = imgUploadRes.imageUrl || "";
          onClose();
        } catch (error) {
          console.log("Image upload failed:", error);
          toast.error("Image upload failed. Please try again.");
          return;
        }
      }

      const response = await axiosInstance.post("/edit-story" + storyId, {
        title,
        story,
        imageUrl: imageUrl || "",
        visitedLocation,
        visitedDate: visitedDate
          ? moment(visitedDate).valueOf()
          : moment().valueOf(),
      });

      if (response.data && response.data.story) {
        toast.success("Story Added Successfully");
        // Refresh Stories
        getAllStories();
        //close the modal
        onClose();
      }
    }
    catch (error) {
      console.log("Error adding story:", error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message)
      } else (
        setError("An unexpected Error Occurred, Please Try again")
      )
    }
  };


  const addNewTravelStory = async () => {
    try {
      let imageUrl = "";

      //upload image if present
      if (storyImg) {
        try {
          const imgUploadRes = await uploadImage(storyImg);
          imageUrl = imgUploadRes.imageUrl || "";
          onClose();
        } catch (error) {
          console.log("Image upload failed:", error);
          toast.error("Image upload failed. Please try again.");
          return;
        }
      }

      const response = await axiosInstance.post("/add-travel-story", {
        title,
        story,
        imageUrl: imageUrl || "",
        visitedLocation,
        visitedDate: visitedDate
          ? moment(visitedDate).valueOf()
          : moment().valueOf(),
      });

      if (response.data && response.data.story) {
        toast.success("Story Added Successfully");
        // Refresh Stories
        getAllStories();
        //close the modal
        onClose();
      }
    }
    catch (error) {
      console.log("Error adding story:", error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message)
      } else (
        setError("An unexpected Error Occurred, Please Try again")
      )
    }
  };

  const handleAddOrUpdateClick = async () => {
    setError(""); // Clear error at start
    if (!title) return setError("Please enter the title.");
    if (!story) return setError("Please enter the story.");

    // Clear error and proceed with add/update
    setError("");
    type === "edit" ? updateTravelStory() : addNewTravelStory();

    console.log("input data:", { title, storyImg, story, visitedLocation, visitedDate })
  };

  const handleDeleteStoryImg = async () => {
    // Any logic for deleting the image, like an API call
    setStoryImg(null); // Reset the image in component state
  };

  return (
    <div className="relative">
      <div className="flex items-center justify-between">
        <h5 className="text-xl font-medium text-slate-700">
          {type === "add" ? "Add Story" : "Update Story"}
        </h5>

        <div>
          <div className="flex items-center gap-3 bg-cyan-50/50 p-2 rounded-l-lg">
            <button className="btn-small" onClick={handleAddOrUpdateClick}>
              {type === "add" ? (
                <>
                  <MdAdd className="text-lg" /> ADD STORY
                </>
              ) : (
                <>
                  <MdUpdate className="text-lg" /> UPDATE STORY
                </>
              )}
            </button>
            <button onClick={onClose}>
              <MdClose className="text-xl text-slate-400 hover:text-slate-700" />
            </button>
          </div>
        </div>

      </div>

      {error && <p className="text-red-500 text-xs">{error}</p>}

      <div>
        <div className="flex-1 flex flex-col gap-2 pt-4">
          <label className="input-label">TITLE</label>
          <input
            type="text"
            className="input-box"
            placeholder="A Day at the Great Wall"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />

          <div className="my-3">
            <DateSelector date={visitedDate} setDate={setVisitedDate} />
          </div>

          <ImageSelector
            image={storyImg}
            setImage={setStoryImg}
            handleDeleteImg={handleDeleteStoryImg}
          />

          <label className="input-label">STORY</label>
          <textarea
            type="text"
            className="text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded"
            placeholder="Your Story"
            rows={10}
            value={story}
            onChange={({ target }) => setStory(target.value)}
          />
        </div>

        <div className="pt-3">
          <label className="input-label">VISITED LOCATIONS</label>
          <TagInput tags={visitedLocation} setTags={setVisitedLocation} />
        </div>
      </div>
    </div>
  );
};

export default AddEditTravelStory;
