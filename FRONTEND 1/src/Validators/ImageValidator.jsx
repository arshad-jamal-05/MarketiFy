export default function ImageValidator(e) {
  let files = Array.from(e.target.files);
  if (files.length === 1) {
    let pic = files[0];
    if (
      !(
        pic.type === "image/jpeg" ||
        pic.type === "image/jpg" ||
        pic.type === "image/png" ||
        pic.type === "image/webp" ||
        pic.type === "image/gif"
      )
    ) {
      return "Invalid Pic Format, Please Upload and Image of Type .jpg, .jpeg, .png, .webp, .gif";
    } else if (pic.size > 2097152) {
      return "Pic is Too Heavy, Please Upload an Image Upto 2 MB";
    } else {
      return "";
    }
  } else {
    let errorMessage = [];
    Array.from(e.target.files).forEach((pic, index) => {
      if (
        !(
          pic.type === "image/jpeg" ||
          pic.type === "image/jpg" ||
          pic.type === "image/png" ||
          pic.type === "image/webp" ||
          pic.type === "image/gif"
        )
      ) {
        errorMessage.push(`Invalid Pic ${index + 1} Format, Please Upload and Image of Type .jpg, .jpeg, .png, .webp, .gif.`);
      } else if (pic.size > 2097152) {
        errorMessage.push(`Pic ${index + 1} is Too Heavy, Please Upload an Image Upto 2 MB.`);
      }
    });
    return errorMessage.length ? errorMessage.join("") : "";
  }
}
