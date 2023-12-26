import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import Contact from "../component/Contact";
import { FaShare, FaMapMarkerAlt } from "react-icons/fa";
import Shimmer from "../component/Shimmer";
const Listing = () => {
  const [contact, setContact] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const [copied, setCopied] = useState(false);
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const params = useParams();

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/listing/get/${params.listingId}`);
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setLoading(false);
        setListing(data);
        setError(false);
      } catch (error) {
        setLoading(false);
        setError(true);
      }
    };
    fetchListing();
  }, [params.listingId]);
  return (
    <main>
      {loading && <Shimmer />}
      {error && (
        <p className="text-center my-7 text-2xl">Something went wrong</p>
      )}
      {listing && !loading && !error && (
        <div>
          <Carousel infiniteLoop={true} autoPlay={true} showThumbs={false}>
            {listing.imageUrls.map((url) => (
              <div key={url}>
                <img src={url} alt="Image" />
              </div>
            ))}
          </Carousel>

          <div
            className="fixed top-[13%] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100
          cursor-pointer"
          >
            <FaShare
              className="text-slate-500"
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                setCopied(true);
                setTimeout(() => {
                  setCopied(false);
                }, 2000);
              }}
            />
          </div>
          {copied && (
            <p className="fixed top-[23%] right-[5%] z-10 rounded-md bg-slate-100 p-2">
              Link copied!
            </p>
          )}
          <div className="flex flex-wrap flex-col max-w-4xl mx-auto p-3 my-5 gap-4">
            <p className="text-2xl font-semibold">
              {listing.name} - Rs
              {listing.offer
                ? listing.discountPrice.toLocaleString("en-US")
                : listing.regularPrice.toLocaleString("en-US")}
            </p>
            <p className="flex items-center mt-6 gap-2 text-slate-600  text-sm">
              <FaMapMarkerAlt className="text-green-700" />
              {listing.address}
            </p>
            <div className="flex gap-4 items-center">
              <p className="bg-red-800 w-full max-w-[200px] text-white text-center p-1 rounded-md  ">
                For sale
              </p>
            </div>
            <p className="text-slate-800">
              <span className="font-semibold text-black">Description -{}</span>
              {listing.description}
            </p>

            {currentUser && listing.useRef !== currentUser._id && !contact && (
              <button
                onClick={() => setContact(true)}
                className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-90"
              >
                Contact Owner
              </button>
            )}
            {contact && <Contact listing={listing} />}
          </div>
        </div>
      )}
    </main>
  );
};

export default Listing;
