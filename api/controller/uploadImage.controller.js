import { v2 as cloudinary } from "cloudinary";
function isFileTypeSupported(type, supportedformat) {
  return supportedformat.includes(type);
}

async function uploadFileToCloudinary(file, folder) {
  const options = { folder };
  return await cloudinary.uploader.upload(file.tempFilePath, options);
}
export const uploadImage = async (req, res) => {
  try {
    const image = req.files.image;
    const supportedformat = ["jpeg", "jpg", "png"];
    const imageformat = image.name.split(".")[1].toLowerCase();
    if (!isFileTypeSupported(imageformat, supportedformat)) {
      console.log(imageformat);
      return res.status(400).json({
        success: false,
        message: "image is not in supported format",
      });
    }
    const response = await uploadFileToCloudinary(image, "learning documents");
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
  }
};
