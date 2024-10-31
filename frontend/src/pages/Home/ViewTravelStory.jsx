//viewTravelStory
import { MdUpdate, MdClose, MdDeleteOutline } from "react-icons/md";

const ViewTravelStory = ({ onClose, onDeleteClick, onEditClick, type, storyInfo }) => {
  return (
    <div className="relative p-2 bg-white rounded">
      <div className="flex items-center justify-end">
        <div className="flex items-center gap-3 bg-cyan-50/50 p-2 rounded-lg">
          <button onClick={onEditClick} className="flex items-center gap-1 btn-small">
            <MdUpdate className="text-lg" />
            UPDATE STORY
          </button>
          
          <button onClick={onDeleteClick} className="flex items-center gap-1 btn-delete">
            <MdDeleteOutline className="text-lg" />
            DELETE STORY
          </button>

          <button onClick={onClose} className="ml-2">
            <MdClose className="text-xl text-slate-400 hover:text-slate-700" />
          </button>
        </div>
      </div>

      <div>
        <div className="flex-1 flex flex-col gap2 py-4">
          <h1>{storyInfo && storyInfo.title}</h1>
        </div>
      </div>
    </div>
  );
};

export default ViewTravelStory;
