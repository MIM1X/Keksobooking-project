import { creatMarkupFunc } from "./markup-utils.js";
import { TYPES } from "./constants.js";
const Markup = creatMarkupFunc();

const popup = document.querySelector("#card").content.querySelector(".popup");

export function createAdvertMarkup(dataArray) {
  const advertMarkupArray = [];

  dataArray.forEach((advert) => {
    const newPopup = popup.cloneNode(true);
    Markup.setElementText(newPopup, ".popup__title", advert.offer.title);
    Markup.setElementText(
      newPopup,
      ".popup__text--address",
      advert.offer.address
    );

    newPopup.querySelector(".popup__text--address").dataset.lat =
      advert.location.lat;

    newPopup.querySelector(".popup__text--address").dataset.lng =
      advert.location.lng;

    Markup.setElementText(
      newPopup,
      ".popup__text--price",
      advert.offer.price + " ₽/ночь"
    );
    Markup.setElementText(
      newPopup,
      ".popup__type",
      TYPES[advert.offer.type].name
    );
    Markup.setElementText(
      newPopup,
      ".popup__text--capacity",
      advert.offer.rooms + " комнаты для " + advert.offer.guests + " гостей"
    );
    Markup.setElementText(
      newPopup,
      ".popup__text--time",
      "Заезд после " +
        advert.offer.checkin +
        ", выезд до " +
        advert.offer.checkout
    );

    if (advert.offer.features) {
      const features = newPopup.querySelector(".popup__features").children;
      for (let i = features.length - 1; i >= 0; i--) {
        const feature = features[i];
        const isFeatureValid = advert.offer.features.some((allowedFeature) =>
          feature.classList.contains(`popup__feature--${allowedFeature}`)
        );

        if (!isFeatureValid) {
          feature.remove();
        }
      }
    }

    Markup.setElementText(
      newPopup,
      ".popup__description",
      advert.offer.description
    );

    if (advert.offer.photos) {
      const photos = newPopup.querySelector(".popup__photos");
      const newPhoto = photos.querySelector(".popup__photo").cloneNode(true);

      photos.replaceChildren(
        ...advert.offer.photos.map((photo) => {
          const newPhotoClone = newPhoto.cloneNode(true);
          newPhotoClone.src = photo;
          return newPhotoClone;
        })
      );
    } else {
      newPopup.querySelector(".popup__photos").replaceChildren();
    }

    newPopup.querySelector(".popup__avatar").src = advert.author.avatar;

    advertMarkupArray.push(newPopup);
  });
  return advertMarkupArray;
}
