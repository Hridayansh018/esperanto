import logo from "../assets/esperanto.png"
import ProfileInfo from "../components/cards/ProfileInfo"

const Navbar = ({userInfo}) => {

  return (
    <div className="bg -white flex items-center justify-between px-6 py-2 shadow sticky top-0 z-10 w-full">
      <img src={logo} alt="logo" className="h-9 drop-shadow-sm"/>

      <ProfileInfo userInfo={userInfo}/>
    </div>
  )
}

export default Navbar
