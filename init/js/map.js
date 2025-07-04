import { CENTER_TOKYO } from "./constants.js";
import { createAdvertMarkup } from "./advert-markup.js";
import { getServerData } from "./api.js";
import { creatMarkupFunc } from "./markup-utils.js";
const Markup = creatMarkupFunc();

const map = L.map("map-canvas")
  .on("load", () => {
    Markup.setElementsState(".map__filters", true);
    Markup.setElementsState(".ad-form", true);
  })
  .setView(CENTER_TOKYO, 12);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: "/img/main-pin.svg",
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const pinIcon = L.icon({
  iconUrl: "/img/pin.svg",
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const similarMarkerGroup = L.layerGroup().addTo(map);

const mainPinMarker = L.marker(CENTER_TOKYO, {
  draggable: true,
  icon: mainPinIcon,
});

mainPinMarker.addTo(map);

getServerData().then((Adverts) => {
  createAdvertMarkup(Adverts).forEach((advert) => {
    const pinMarker = L.marker(
      {
        lat: advert.querySelector(".popup__text--address").dataset.lat,
        lng: advert.querySelector(".popup__text--address").dataset.lng,
      },
      {
        icon: pinIcon,
      }
    );
    pinMarker.addTo(similarMarkerGroup).bindPopup(advert);
  });
});

export { mainPinMarker, map };
