import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { registerUser } from "../../api/api";
import { useDispatch } from "react-redux";
import { registerSuccess, setUser } from "../../redux/slices/authSlice";
import { FcGoogle } from "react-icons/fc";

import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../firebase";
import api from "../../api/axios";

const Register =  () => {
  const navigate = useNavigate();

const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      setError("Please fill all fields");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

   try {

    const res = await registerUser({
        name,
        email,
        password,
    });

    // dispatch(registerSuccess(res.user));
   dispatch(setUser(res.user));

    navigate("/");

} catch (err) {

    setError(
        err.response?.data?.message || "Registration failed"
    );

}
  };


  const handleGoogleLogin = async (e) => {
  try {
    e.preventDefault();
    const result = await signInWithPopup(auth, provider);

    const user = result.user;

    console.log(user);

    // Send token to backend
    const token = await user.getIdToken();

    const res = await api.post("/auth/google",{
      token
    });
     

    // const data = await res.json();
    // console.log("user = ",data);

     dispatch(setUser(res.data.user));

    navigate("/");

  } catch (err) {
    console.log(err);
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg)] px-4">

      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[var(--card)] shadow-md rounded-xl p-8 w-full max-w-md"
      >

        <h1 className="text-2xl font-bold text-center mb-6">
          Register
        </h1>

        {/* Error */}
        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Name */}
          <div>
            <label className="text-sm">Name</label>
            <input
              type="text"
              className="w-full bg-[var(--bg)] outline-none p-2 rounded mt-1"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter name"
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-sm">Email</label>
            <input
              type="email"
              className="w-full bg-[var(--bg)] outline-none  p-2 rounded mt-1"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-sm">Password</label>
            <input
              type="password"
              className="w-full bg-[var(--bg)] outline-none p-2 rounded mt-1"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
          >
            Register
          </button>

        </form>

      <div className="pt-2">
            <h4  className=" flex justify-center items-center text-sm">
              ---- Or continue with social account --- 
            </h4>
            <div className="w-full flex justify-center items-center gap-3 py-2 ">
            
            <button onClick={handleGoogleLogin} className="flex  gap-1"  text="Sign In with Google" >
               <FcGoogle className="text-2xl" />  
               <p className="font-bold text-xl">Google</p>
            </button>
            </div>
          </div>

          <hr />


        {/* Login Link */}
        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600">
            Login
          </Link>
        </p>

      </motion.div>

    </div>
  );
};

export default Register;


