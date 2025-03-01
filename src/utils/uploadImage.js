import axios from "axios";

const uploadImage = async (imageName, imgFile) => {
  // Return early if no image file is provided
  if (!imgFile) return null;

  const data = new FormData();
  data.append("file", imgFile);
  data.append("upload_preset", "imagePreset");

  // Add the public_id for better image organization in Cloudinary
  if (imageName) {
    // Clean the name to be URL-friendly
    const cleanImageName = imageName.replace(/[^a-zA-Z0-9_]/g, "_");
    data.append("public_id", cleanImageName);
  }

  try {
    const cloudName = import.meta.env.VITE_CLOUD_NAME;
    const resourceType = "image";
    const api = `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`;

    const res = await axios.post(api, data);
    const { secure_url } = res.data;
    return secure_url;
  } catch (err) {
    console.error("Error uploading image:", err);
    return null;
  }
};

export default uploadImage;
