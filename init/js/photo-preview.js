import { FILE_TYPES } from "./constants.js";

const setPreview = function (fileChooser, preview) {
  fileChooser.addEventListener("change", () => {
    const file = fileChooser.files[0];
    const fileName = file.name.toLowerCase();
    const matches = FILE_TYPES.some((it) => {
      return fileName.endsWith(it);
    });

    if (matches) {
      const img = document.createElement("img");
      img.src = URL.createObjectURL(file);
      img.style.height = "100%";
      img.style.width = "100%";
      preview.replaceChildren(img);
    }
  });
};

export { setPreview };
