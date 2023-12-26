import { FaGithub } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa6";

const Footer = () => {
  return (
    <div className="flex py-5 items-center justify-around  mx-auto bg-slate-600">
      <div>
        <p className="text-white">© Copyright 2023,All rights reserved</p>
      </div>
      <div className="flex gap-8">
        <FaGithub className="w-12 h-12 hover:bg-yellow-300 rounded-full transition-all duration-300 cursor-pointer" />
        <FaFacebook className="w-12 h-12 hover:bg-yellow-300 rounded-full transition-all duration-300 cursor-pointer" />
      </div>
    </div>
  );
};

export default Footer;
