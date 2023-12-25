import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { checkData } from "../utlis/validateUser";
import { signInStart, signInFailure, signInSuccess } from "../Redux/userSlice";
import { useDispatch, useSelector } from "react-redux";

const SignIn = () => {
  const { loading, error } = useSelector((state) => state.user);
  const [response, setResponse] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});

  function handleChange(e) {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = checkData(formData.email, formData.password);
    setResponse(message);
    if (!message) {
      try {
        dispatch(signInStart());
        const res = await fetch("/api/auth/signin", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        const data = await res.json();
        if (data.success === false) {
          dispatch(signInFailure(data.message));

          return;
        }

        dispatch(signInSuccess(data));
        navigate("/");
      } catch (error) {
        dispatch(signInFailure(error.message));
      }
    }
  };
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">SignIn</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          id="email"
          className="bg-slate-100 p-3 rounded-lg focus:outline-none "
          onChange={handleChange}
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
          {loading ? "Loading..." : "Sign In"}
        </button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Dont have an account?</p>
        <Link to="/sign-up">
          <span className="text-blue-500">Sign Up</span>
        </Link>
      </div>
      {error && <p className="text-red-500 mt-5">{error}</p>}
      {response && <p className="text-red-500 mt-5">{response}</p>}
    </div>
  );
};

export default SignIn;
