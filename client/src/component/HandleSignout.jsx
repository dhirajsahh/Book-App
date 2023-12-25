import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  signOutUserFailure,
  signOutUserStart,
  signOutUserSuccess,
} from "../Redux/userSlice";

const HandleSignout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  async function handleSignoutUser() {
    try {
      dispatch(signOutUserStart());
      const res = await fetch("/api/auth/signout");
      const data = await res.json();
      if (data.success === false) {
        dispatch(signOutUserFailure(data.message));
      }
      dispatch(signOutUserSuccess(data));
      navigate("/sign-in");
    } catch (error) {
      dispatch(signOutUserFailure(error.message));
    }
  }
  return (
    <div>
      <span
        onClick={handleSignoutUser}
        className="text-red-700 cursor-pointer "
      >
        Signout
      </span>
    </div>
  );
};

export default HandleSignout;
