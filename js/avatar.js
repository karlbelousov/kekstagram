const FILE_TYPES = ["gif", "jpg", "jpeg", "png"];

const chosenFile = document.querySelector("#upload-file");
const preview = document.querySelector(".img-upload__preview img");
const effectPreview = document.querySelectorAll(".effects__preview");

chosenFile.addEventListener("change", () => {
  const file = chosenFile.files[0];
  const fileName = file.name.toLowerCase();
  const fileUrl = URL.createObjectURL(file);

  const matches = FILE_TYPES.some((it) => {
    return fileName.endsWith(it);
  });

  if (matches) {
    preview.src = fileUrl;
    effectPreview.forEach((item) => {
      item.style.backgroundImage = `url(${fileUrl})`;
    });
  }
});
