import { galleryItems } from "./gallery-items.js";
// Change code below this line

// console.log(galleryItems);

const gallery = document.querySelector(".gallery");
const galleryMarkup = galleryItems.map(({ preview, original, description }) => (
  `<li class="gallery__item">
    <a class="gallery__link" href="${original}">
      <img
        class="gallery__image"
        src="${preview}"
        data-source="${original}"
        alt="${description}"
      />
    </a>
  </li>`
)).join("");

gallery.innerHTML = galleryMarkup;


function chooseImage(event) {
    event.preventDefault();

    if(event.target.nodeName !== 'IMG') {
        return;
    }

    const instance = basicLightbox.create(
        `<div class="modal">
            <img src="${event.target.dataset.source}" class="openedimg">
        </div>`, {
            onShow:(instance) => {
                window.addEventListener('keydown', closeModalOnEsc);
            },
            onShow: (instance) => {
                instance.element().querySelector('img.openedimg').onclick = instance.close
            },
            inClose:(instance) => {
                window.removeEventListener('keydown', closeModalOnEsc);
            },
        }
    )
    instance.show();

    function closeModalOnEsc(event) {
        if(event.code === "Escape") {
            instance.close();
        }
    }
};

gallery.addEventListener('click', chooseImage);
