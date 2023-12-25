import { useRef, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
} from "../Redux/userSlice";
import HandleDeleteUser from "../component/HandleDeleteUser";
import HandleSignout from "../component/HandleSignout";

const Profile = () => {
  const dispatch = useDispatch();
  const fileRef = useRef();
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({});
  const [uploading, setUploading] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [file, setFile] = useState(null);
  const [erroruploading, setErrorUploading] = useState(false);
  useEffect(() => {
    if (file) {
      handleUpload(file);
    }
  }, [file]);
  const handleUpload = async () => {
    setUploading(true);
    let formData = new FormData();
    formData.append("image", file);

    const res = await fetch("/api/user/uploadImage", {
      method: "POST",
      body: formData,
    });
    const imageUrl = await res.json();
    if (imageUrl.success === false) {
      setErrorUploading(imageUrl.message);
    } else {
      setFormData({ ...formData, avatar: imageUrl });
      setUploading(false);
      setErrorUploading(false);
    }
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  async function handleSubmit(e) {
    e.preventDefault();

    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success == false) {
        dispatch(updateUserFailure(data));
        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  }

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <input
        type="file"
        ref={fileRef}
        hidden
        accept="image/*"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <img
          src={formData?.avatar || currentUser?.avatar}
          alt="ProfilePicture"
          className="rounded-full w-24 h-24 object-cover cursor-pointer self-center mt2 "
          onClick={() => fileRef.current.click()}
        />
        <p className="self-center">{uploading && "uploading..."}</p>
        <input
          type="text"
          placeholder="Username"
          id="username"
          className="bg-slate-100 p-3 rounded-lg focus:outline-none "
          onChange={handleChange}
          defaultValue={currentUser?.username}
        />
        <input
          type="email"
          placeholder="Email"
          id="email"
          className="bg-slate-100 p-3 rounded-lg focus:outline-none "
          onChange={handleChange}
          defaultValue={currentUser?.email}
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          className="bg-slate-100 p-3 rounded-lg focus:outline-none "
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "loading..." : "update"}
        </button>
        <Link
          to="/create-listing"
          className="bg-green-700 text-white p-3 rounded-lg text-center uppercase hover:opacity-95"
        >
          Create Listing
        </Link>
      </form>

      <div className="flex justify-between mt-4">
        <HandleDeleteUser currentUser={currentUser} />
        <HandleSignout />
      </div>
      <p className="text-red-700 mt-5">{error ? error.message : ""}</p>
      <p className="text-red-700 mt-5">{erroruploading && erroruploading}</p>
      <p className="text-green-700 mt-5">
        {updateSuccess ? "User is updated successfully" : ""}
      </p>
    </div>
  );
};

export default Profile;
