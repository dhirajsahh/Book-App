import { Link } from "react-router-dom";
import { logo } from "../utlis/Constant";

const Header = () => {
  function handleSubmit(e) {
    e.preventDefault();
  }
  return (
    <div>
      <header className="bg-slate-200 shadow-md">
        <div className="flex justify-around items-center  mx-auto p-3">
          <img src={logo} alt="logo" className="w-16 h-16 rounded-full" />
          <form
            className="bg-slate-100 p-3 rounded-lg flex items-center"
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent focus:outline-none w-24 sm:w-64"
            />
            <button>search</button>
          </form>
          <ul className="flex gap-4">
            <Link to="/">
              <li className="hidden sm:inline text-slate-700 hover:underline">
                Home
              </li>
            </Link>
            <Link to="/about">
              <li className="hidden sm:inline text-slate-700 hover:underline">
                About
              </li>
            </Link>
            <Link to="/sign-in">
              <li className="hidden sm:inline text-slate-700 hover:underline">
                SignIn
              </li>
            </Link>
          </ul>
        </div>
      </header>
    </div>
  );
};

export default Header;
