import { MdLocationOn } from "react-icons/md";
import { Link } from "react-router-dom";

const ListingItem = ({ listing }) => {
  return (
    <div className="bg-white shadow-md  hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[300px]">
      <Link to={`/listing/${listing._id}`}>
        <img
          src={listing.imageUrls[0]}
          alt={listing.name}
          className="h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300"
        />
        <div className="p-3 flex flex-col gap-2 w-full ">
          <p className="text-lg font-semibold text-slate-600 truncate">
            {listing.name}
          </p>
          <div className="flex items-center gap-1">
            <MdLocationOn className="w-4 h-4 text-green-700" />
            <p className="text-sm text-gray-600">{listing.address}</p>
          </div>
          <div>
            <p className="truncate">{listing.description}</p>
            <p className="text-slate-600">
              {" "}
              Rs{listing.offer ? listing.discountPrice : listing.regularPrice}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ListingItem;
