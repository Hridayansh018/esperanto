// ViewTravelStory.jsx
import moment from "moment";
import { MdUpdate, MdClose, MdDeleteOutline } from "react-icons/md";
import { GrMapLocation } from "react-icons/gr";

const ViewTravelStory = ({ onClose, onDeleteClick, onEditClick, storyInfo }) => {
  if (!storyInfo) return null;

  return (
    <div className="relative bg-white rounded-lg w-full mx-auto">
      {/* Header with Action Buttons */}
      <div className="flex items-center justify-end">
        <div className="flex gap-2 bg-cyan-50/50 p-2 rounded-lg">
          <button onClick={onEditClick} className="flex items-center gap-1 btn-small">
            <MdUpdate className="text-lg" />
            UPDATE STORY
          </button>
          <button onClick={onDeleteClick} className="flex items-center btn-delete">
            <MdDeleteOutline className="text-lg" />
            DELETE STORY
          </button>
          <button onClick={onClose} className="">
            <MdClose className="text-xl text-slate-400 hover:text-slate-700" />
          </button>
        </div>
      </div>

      {/* Story Details */}
      <div className="flex-1 flex flex-col gap-2 py-4">
        <h1 className="text-2xl font-semibold text-slate-950">{storyInfo.title}</h1>
        
        <div className="flex items-center justify-between gap-3 mb-2">
          <span className="text-xs text-slate-500">
            {moment(storyInfo.visitedDate).format("Do MMM YYYY")}
          </span>
          
          <div className="inline-flex items-center gap-2 text-[13px] text-cyan-600 bg-cyan-200/40 rounded px-2 py-1">
            <GrMapLocation className="text-sm" />
            {storyInfo.visitedLocation}
          </div>
        </div>

        <img 
          src={storyInfo.imageUrl || "https://via.placeholder.com/300"}
          alt="Selected"
          className="w-full h-[300px] object-cover rounded-lg mb-4"
        />

        <div>
          <p className="text-lg text-slate-950 leading-6 text-justify whitespace-pre-line">
            {storyInfo.story}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ViewTravelStory;
