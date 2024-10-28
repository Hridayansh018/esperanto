import { useNavigate } from 'react-router-dom';
import axiosInstance from './axiosInstance';

export const validateEmail = (email) => {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
};

export const getInitials = (name) => {
  if (!name) return "";
  const words = name.trim().split(" ").filter(Boolean);
  let initials = "";
  for (let i = 0; i < Math.min(words.length, 2); i++) {
    initials += words[i][0];
  }
  return initials.toUpperCase();
};

// Define getUserInfo function here
export const getUserInfo = async (setUserInfo, navigate) => {
  try {
    const response = await axiosInstance.get("/get-user");
    if (response.data && response.data.user) {
      setUserInfo(response.data.user);
    }
  } catch (error) {
    if (error.response?.status === 401) {
      localStorage.clear();
      navigate('/login');
    }
  }
};

