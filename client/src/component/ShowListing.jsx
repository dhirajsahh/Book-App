import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Shimmer from "./Shimmer";
const ShowListing = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [showListingError, setShowListingError] = useState();
  const [showListing, setShowListing] = useState([]);
  const [getListing, setGetListing] = useState(false);

  const handleShowListing = async () => {
    setShowListingError(false);
    setGetListing(true);
    const res = await fetch(`/api/user/listing/${currentUser._id}`);
    const data = await res.json();
    setShowListing(data);
    if (data.success === false) {
      setShowListingError(true);
      return;
    }
    setGetListing(false);
  };
  const handleListingDelete = async (listingId) => {
    try {
      const res = await fetch(`/api/listing/delete/${listingId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }

      setShowListing((prev) =>
        prev.filter((listing) => listing._id !== listingId)
      );
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div>
      <button
        disabled={getListing}
        onClick={handleShowListing}
        className="text-green-700 w-full disabled:opacity-80"
      >
        Show Listing
      </button>
      <p>{showListingError && "Error showing listing"}</p>
      {showListing && showListing.length > 0 && (
        <div className="flex flex-col gap-4">
          <h1 className="text-center text-3xl font-semibold mt-7">
            Your Listing
          </h1>
          {showListing.map((listing) => {
            return (
              <div
                key={listing._id}
                className="flex border rounded-lg items-center gap-4"
              >
                <Link to={`/listing/${listing._id}`}>
                  <img
                    src={listing.imageUrls[0]}
                    alt="listing cover"
                    className="h-24 w-24 object-contain"
                  />
                </Link>
                <Link
                  className="flex-1 text-slate-700 font-semibold hover:underline truncate"
                  to={`/listing/${listing._id}`}
                >
                  <p> {listing.name}</p>
                </Link>
                <div className="flex flex-col">
                  <button
                    onClick={() => handleListingDelete(listing._id)}
                    className="text-red-700 uppercase"
                  >
                    Delete
                  </button>
                  <Link to={`/update-listing/${listing._id}`}>
                    <button className="text-green-700 uppercase">Edit</button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ShowListing;
