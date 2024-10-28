import logo from "../assets/esperanto.png";
import ProfileInfo from "../components/cards/ProfileInfo";

const Navbar = ({ userInfo }) => {
  // Define the onLogout function here
  const onLogout = () => {
    // Clear local storage and navigate to login (or other logic)
    localStorage.clear();
    window.location.href = "/login"; // Redirect or use navigate if using react-router-dom
  };

  return (
    <div className=" bg-opacity-20 flex items-center justify-between px-6 py-2 shadow sticky top-0 z-10 w-full backdrop-filter backdrop-blur-lg">
      <img src={logo} alt="logo" className="h-12 drop-shadow-sm" />
      
      {/* Pass onLogout as a prop */}
      <ProfileInfo userInfo={userInfo} onLogout={onLogout} />
    </div>
  );
};

export default Navbar;
