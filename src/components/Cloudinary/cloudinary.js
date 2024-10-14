const cloudinary = require("cloudinary").v2;

exports.cloudinaryConnect = () => {
  try {
    cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.API_KEY,
      api_secret: process.env.API_SECRET,
    });
  } catch (error) {
    console.log(error);
  }
};

// Cloudinary image upload
exports.uploadImage = async (file) => {
  try {
    const result = await cloudinary.uploader.upload(file, {
      folder: "Ashutosh",
    });
    return result.secure_url; // Return the URL of the uploaded image
  } catch (error) {
    console.error("Cloudinary Upload Error:", error);
    throw new Error("Image upload failed");
  }
};
