import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../utlis/firebase.js";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../Redux/userSlice.js";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
const OAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [btndisabled, setBtnDisabled] = useState(false);
  const handleGoogleClick = async () => {
    try {
      const provider = await new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      setBtnDisabled(true);
      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });
      setBtnDisabled(false);
      const data = await res.json();
      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      console.log("Could not login with google", error.message);
    }
  };
  return (
    <button
      type="button"
      onClick={handleGoogleClick}
      className="bg-red-700 p-3 rounded-lg text-white uppercase disabled:opacity-80"
      disabled={btndisabled}
    >
      Continue with google
    </button>
  );
};

export default OAuth;
