import { MdAdd, MdClose, MdUpdate } from "react-icons/md";
import DateSelector from "../../components/input/DateSelector";
import { useState } from "react";
import ImageSelector from "../../components/input/ImageSelector";
import TagInput from "../../components/input/TagInput";

const AddEditTravelStory = ({
  storyInfo,
  type,
  onClose,
  getAllStories
}) => {
  const [visitedDate, setVisitedDate] = useState(null);
  const [visitedLocation, setVisitedLocation] = useState([]);
  const [title, setTitle] = useState('');
  const [storyImg, setStoryImg] = useState(null);
  const [story, setStory] = useState('');

  const handleAddOrUpdateClick = async () => { };

  const handleDeleteClick = async () => { };

  const handleDeleteStoryImg = async () => {
    // Any logic for deleting the image, like an API call
    setStoryImg(null); // Reset the image in component state
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <h5 className="text-xl font-medium text-slate-700">
          {type === "add" ? "Add Story" : "Update Story"}
        </h5>

        <div>
          <div className="flex items-center gap-3 bg-cyan-50/50 p-2 rounded-l-lg">
            {type === "add" ? (
              <button className="btn-small" onClick={handleAddOrUpdateClick}>
                <MdAdd className="text-lg" /> ADD STORY
              </button>
            ) : (
              <>
                <button className="btn-small" onClick={handleAddOrUpdateClick}>
                  <MdUpdate className="text-lg" /> UPDATE STORY
                </button>
              </>
            )}
            <button onClick={onClose}>
              <MdClose className="text-xl text-slate-400 hover:text-slate-700" />
            </button>
          </div>
        </div>
      </div>
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
