export const storeImage = async (file) => {
  let formData = new FormData();
  formData.append("image", file);

  const res = await fetch("/api/user/uploadImage", {
    method: "POST",
    body: formData,
  });
  const imageUrl = await res.json();
  return imageUrl;
};
