import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import ListingItem from "../component/ListingItem";

const Home = () => {
  const [listing, setListing] = useState([]);
  console.log(listing);
  useEffect(() => {
    const fetchListing = async () => {
      try {
        const response = await fetch("/api/listing/get?limit=3");
        const json = await response.json();
        setListing(json);
      } catch (error) {
        console.log(error);
      }
    };
    fetchListing();
  }, []);
  return (
    <div>
      <div className="flex flex-col gap-5 max-w-6xl mx-auto pt-16 pb-7 px-3">
        <h1 className="text-slate-700 font-bold text-3xl lg:text-6xl">
          Give Old Books <span className="text-slate-500">New Homes</span>
          <br /> Shop and Sell with ease
        </h1>
        <div>
          <p className="text-gray-400 text-md sm:text-sm">
            Welcome to your literary haven! This is your go-to destination for
            <br /> buying and selling pre-owned books. Immerse yourself in a
            diverse collection,
            <br /> connect with fellow book enthusiasts Your next favorite read
            is just a click away
          </p>
        </div>
        <Link
          to="/search"
          className="text-xs sm:text-sm text-blue-700 font-bold hover:underline"
        >
          Lets get started ...
        </Link>
      </div>
      <div className="max-w-6xl mx-auto">
        <Carousel infiniteLoop={true} autoPlay={true}>
          {listing &&
            listing.length > 0 &&
            listing?.map((item) => (
              <div key={item.id} className="p-2">
                <img
                  src={item.imageUrls[0]}
                  alt={item.name}
                  className="rounded-lg"
                />
              </div>
            ))}
        </Carousel>
      </div>
      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-6 my-7">
        {listing && listing.length > 0 && (
          <div className="">
            <div className="flex flex-col gap-1 flex-wrap mb-2">
              <h2 className="text-2xl font-semibold text-slate-600">
                Our Collection
              </h2>
              <Link
                to={"/search"}
                className="text-sm text-blue-800 hover:underline"
              >
                Show more Collection
              </Link>
            </div>
            <div className="flex flex-wrap justify-around">
              {listing?.map((item) => (
                <ListingItem listing={item} key={item._id} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
