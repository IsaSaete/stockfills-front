type CloudinarySize = "thumb" | "card" | "detail";

const cloudinaryTransformBySize: Record<CloudinarySize, string> = {
  thumb: "c_fill,g_auto,w_120,h_120,q_auto,f_auto",
  card: "c_fill,g_auto,w_320,h_320,q_auto,f_auto",
  detail: "c_fill,g_auto,w_900,h_900,q_auto,f_auto",
};

export const getOptimizedCloudinaryImageUrl = (
  imageUrl: string,
  size: CloudinarySize,
): string => {
  if (!imageUrl.includes("res.cloudinary.com")) return imageUrl;
  if (imageUrl.startsWith("blob:") || imageUrl.startsWith("data:"))
    return imageUrl;
  if (imageUrl.includes("/upload/")) {
    return imageUrl.replace(
      "/upload/",
      `/upload/${cloudinaryTransformBySize[size]}/`,
    );
  }

  return imageUrl;
};
