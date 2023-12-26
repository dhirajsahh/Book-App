import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Shimmer from "../component/Shimmer";
import ListingItem from "../component/ListingItem";

const Search = () => {
  const [loading, setLoading] = useState(false);
  const [listing, setListing] = useState([]);
  const location = useLocation();
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermfromUrl = urlParams.get("searchTerm");

    const fetchlistings = async () => {
      setLoading(true);
      const searchQuery = urlParams.toString();
      const response = await fetch(`/api/listing/get?${searchQuery}`);
      const json = await response.json();
      setListing(json);
      setLoading(false);
    };
    fetchlistings();
  }, [location.search]);
  return (
    <div>
      <div>
        <h1 className="text-3xl text-center text-slate-500 border-b p-3 font-semibold">
          Listings
        </h1>
      </div>
      <div className="p-6">
        {!loading && listing.length === 0 && (
          <p className="text-xl text-slate-700  text-center">
            No Listing Found !!
          </p>
        )}
        {loading && <Shimmer />}
        <div className="flex gap-10 justify-center items-center flex-col sm:flex-row flex-wrap">
          {!loading &&
            listing &&
            listing.map((item) => (
              <ListingItem key={item._id} listing={item} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Search;
