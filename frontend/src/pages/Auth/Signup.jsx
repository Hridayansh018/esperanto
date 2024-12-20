import { useNavigate } from "react-router-dom";
import { useState } from "react";
import PasswrdInput from "../../components/input/PasswrdInput";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    // Validate name
    if (!name) {
      setError("Please enter your name.");
      return;
    }

    // Validate email
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    // Validate password
    if (!password || password.length < 6) {
      setError("Please enter a valid password with at least 6 characters.");
      return;
    }

    setError(null);

    // Signup API call
    try {
      const response = await axiosInstance.post("/create-account", {
        fullName: name,
        email: email,
        password: password
      });

      // Handle successful signup response
      if (response.data && response.data.accessToken) {
        localStorage.setItem('token', response.data.accessToken);
        navigate('/dashboard');
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="h-screen bg-cyan-50 overflow-hidden relative flex flex-col">

      <div className="login-ui-box" />

      <div className="container h-screen flex items-center justify-center px-20 mx-auto z-50">
        <div className="w-2/4 h-[90vh] flex items-end bg-signup-bg-img bg-cover bg-center rounded-lg p-10 z-5">
          <div>
            <h4 className="text-5xl text-white font-semibold leading-[58px]">
              Join The <br /> Adventure
            </h4>
            <p className="text-[18px] text-white leading-6 pr-7 mt-4 shadow shadow-black bg-black p-4 bg-opacity-30 cursor-pointer hover:scale-105 transition-all ease-in-out">
              Create an account to start documenting your travels and preserving your memories in your personal travel journal.
            </p>
          </div>
        </div>

        <div className="w-2/4 h-[75vh] bg-white rounded-r-lg relative p-16 shadow-lg shadow-cyan-200/20">
          <form onSubmit={handleSignup}>
            <h4 className="text-2xl mb-7 font-semibold">Sign Up</h4>

            <input
              type="text"
              placeholder="Full Name"
              className="input-box text-sm pl-5"
              value={name}
              onChange={({ target }) => setName(target.value)}
            />

            <input
              type="text"
              placeholder="Email"
              className="input-box text-sm pl-5"
              value={email}
              onChange={({ target }) => setEmail(target.value)}
            />

            <PasswrdInput
              value={password}
              placeholder={"Enter Password"}
              onChange={({ target }) => setPassword(target.value)}
            />

            {error && <p className="text-red-500 text-xs pb-1">{error}</p>}

            <button type="submit" className="btn-primary">CREATE ACCOUNT</button>

            <p className="text-xs text-slate-500 text-center my-4">Or</p>

            <button
              type="button"
              className="btn-secondary"
              onClick={() => navigate('/login')}
            >
              Go to Login
            </button> 
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
