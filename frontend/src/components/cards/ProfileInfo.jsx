import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { getInitials } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";
import { useNavigate } from 'react-router-dom';

const ProfileInfo = ({ userInfo = { fullName: "Guest User" }, onLogout }) => {
  const [localUserInfo, setLocalUserInfo] = useState(userInfo);
  const navigate = useNavigate();

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const response = await axiosInstance.get("/get-user");
        if (response.data && response.data.user) {
          setLocalUserInfo(response.data.user);
        }
      } catch (error) {
        if (error.response?.status === 401) {
          localStorage.clear();
          navigate('/login');
        }
      }
    };
    
    getUserInfo();
  }, [navigate]);

  return (
    <div className="flex items-center gap-3">
      <div className="w-12 h-12 flex items-center justify-center font-medium bg-slate-300 text-slate-950 rounded-full">
        {getInitials(localUserInfo?.fullName ?? "")}
      </div>

      <div>
        <p className="text-sm font-medium">
          {localUserInfo?.fullName || "Guest User"}
        </p>
        <button
          className="text-blue-600 hover:text-blue-800 text-xs font-semibold"
          onClick={onLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

// Define expected prop types for ProfileInfo
ProfileInfo.propTypes = {
  userInfo: PropTypes.shape({
    fullName: PropTypes.string
  }),
  onLogout: PropTypes.func.isRequired
};

export default ProfileInfo;
