import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
} from "../Redux/userSlice";

const HandleDeleteUser = ({ currentUser }) => {
  const id = currentUser?._id;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const deleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
      }
      dispatch(deleteUserSuccess(data));
      navigate("/sign-up");
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };
  return (
    <div>
      <span onClick={deleteUser} className="text-red-700 cursor-pointer ">
        Delete account
      </span>
    </div>
  );
};

export default HandleDeleteUser;
