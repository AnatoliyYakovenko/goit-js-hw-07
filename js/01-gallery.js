import { galleryItems } from "./gallery-items.js";
// Change code below this line

const galleryEl = document.querySelector(".gallery");

const markup = galleryItems
  .map(({ preview, original, description }) => {
    return `<a class="gallery__link" href="${original}">
  <img
    class="gallery__image"
    src="${preview}"
    data-source="${original}"
    alt="${description}"
  />`;
  })
  .join("");

galleryEl.insertAdjacentHTML("beforeend", markup);

galleryEl.addEventListener("click", modalImg);

function modalImg(event) {
  event.preventDefault();
  const galleryItemEl = event.target.dataset.source;
  if (!galleryItemEl) return;
  const instance = basicLightbox.create(
    `
      <img src="${galleryItemEl}" width="800" height="auto">
  `,
    {
      onShow: (instance) => {
        window.addEventListener("keydown", closeModal);
      },
      onClose: (instance) => {
        window.removeEventListener("keydown", closeModal);
      },
    }
  );
  function closeModal(event) {
    if (event.code === "Escape") {
      instance.close();
    }
  }
  instance.show();
}
