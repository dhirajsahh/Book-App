import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { storeImage } from "../utlis/storeImage";

const CreateListing = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { currentUser } = useSelector((state) => state.user);
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    imageUrls: [],
    name: "",
    description: "",
    address: "",
    regularPrice: 50,
    discountPrice: 0,
    offer: false,
  });
  const [error, setError] = useState();
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((url, i) => i !== index),
    });
  };

  const handleChange = (e) => {
    if (e.target.id === "offer") {
      setFormData({ ...formData, [e.target.id]: e.target.checked });
    }
    if (
      e.target.type === "number" ||
      e.target.type === "text" ||
      e.target.type === "textarea"
    ) {
      setFormData({ ...formData, [e.target.id]: e.target.value });
    }
  };
  useEffect(() => {
    const fetchListing = async () => {
      const listingId = params.listingId;
      const res = await fetch(`/api/listing/get/${listingId}`);
      const data = await res.json();

      if (data.success === false) {
        console.log(data.message);
        return;
      }
      setFormData(data);
    };
    fetchListing();
  }, []);
  const handleImageSubmit = () => {
    if (files.length > 0 && files.length + formData.imageUrls.length < 4) {
      setUploading(true);
      const promises = [];

      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          });
          setImageUploadError(false);
          setUploading(false);
          setError(false);
        })
        .catch((error) => {
          setImageUploadError("Image upload failed ");
          setUploading(false);
        });
    } else {
      setImageUploadError("You can only upload 3 images per listing");
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.imageUrls.length < 1) {
        setError("You must upload at least one image");
      }
      if (+formData.regularPrice < +formData.discountPrice) {
        setError("Discount price should be less than regular price");
      }
      setLoading(true);
      const res = await fetch(`/api/listing/update/${params.listingId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, useRef: currentUser._id }),
      });
      const data = await res.json();
      navigate(`/listing/${data._id}`);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="bg-slate-300 h-screen">
      <main className="p-3 max-w-4xl mx-auto">
        <h1 className="text-3xl font-semibold text-center my-7">
          Update Listing
        </h1>
        <form
          className="flex flex-col sm:flex-row gap-4"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col gap-4 flex-1">
            <input
              type="text"
              placeholder="Name"
              id="name"
              className="border rounded-lg p-3 focus:outline-none "
              required
              maxLength="50"
              minLength="5"
              onChange={handleChange}
              value={formData.name}
            />
            <textarea
              type="text"
              placeholder="Description"
              id="description"
              className="border rounded-lg p-3 focus:outline-none "
              required
              onChange={handleChange}
              value={formData.descritption}
            />
            <input
              type="text"
              placeholder="Address"
              id="address"
              className="border rounded-lg p-3 focus:outline-none "
              required
              onChange={handleChange}
              value={formData.address}
            />
            <div className="flex gap-6 flex-wrap">
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  id="offer"
                  className="w-5"
                  onChange={handleChange}
                  checked={formData.offer}
                />
                <span>Offer</span>
              </div>
            </div>
            <div className="flex gap-2 items-center">
              <input
                className="p-3 border rounded-lg border-gray-300"
                type="number"
                id="regularPrice"
                min="50"
                max="10000"
                required
                onChange={handleChange}
                value={formData.regularPrice}
              />
              <p>Regular price</p>
            </div>
            {formData.offer && (
              <div className="flex gap-2 items-center">
                <input
                  className="p-3 border rounded-lg border-gray-300"
                  type="number"
                  id="discountPrice"
                  min="0"
                  max="1000"
                  required
                  onChange={handleChange}
                  value={formData.discountPrice}
                />
                <p>Discounted price</p>
              </div>
            )}
          </div>
          <div className="flex flex-col flex-1 gap-4">
            <p className="font-semibold">
              Images:
              <span className="font-normal text-gray-600 ml-2">
                The first image will be cover (max 3)
              </span>
            </p>
            <div className="flex gap-4">
              <input
                onChange={(e) => setFiles(e.target.files)}
                className="p-3 border border-gray-300 rounded-lg w-full"
                type="file"
                id="images"
                accept="images/*"
                multiple
              />
              <button
                disabled={uploading}
                type="button"
                className="p-3 text-green-700 border border-green-700 uppercase hover:shadow-lg disabled:opacity-80 rounded"
                onClick={handleImageSubmit}
              >
                {uploading ? "uploading..." : "upload"}
              </button>
            </div>
            <p className="text-red-700 text-sm">
              {imageUploadError && imageUploadError}
            </p>
            {formData.imageUrls.length > 0 &&
              formData.imageUrls.map((urls, index) => (
                <div
                  key={index}
                  className="flex justify-between p-3 border items-center "
                >
                  <img
                    src={urls}
                    alt="Listing image"
                    className="w-40 h-40 object-cover rounded-lg"
                  />
                  <button
                    className="p-3 text-red-700 uppercase hover:opacity-75 font-semibold"
                    type="button"
                    onClick={() => {
                      handleRemoveImage(index);
                    }}
                  >
                    Delete
                  </button>
                </div>
              ))}

            <button
              disabled={uploading || loading}
              className="p-3 bg-slate-700 text-white rounded-lg uppercase disabled:opacity-90"
            >
              Update Listing
            </button>
            <p className="text-red-700">{error && error}</p>
          </div>
        </form>
      </main>
    </div>
  );
};
export default CreateListing;
