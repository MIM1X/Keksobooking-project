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

function drawPinMarkers(
  filterFeatures = [],
  filters = { type: null, price: null, rooms: null, guests: null }
) {
  similarMarkerGroup.clearLayers();
  getServerData((adverts) => {
    if (filters) {
      adverts = adverts.filter((advert) => {
        if (
          filters.type &&
          filters.type !== "any" &&
          advert.offer.type !== filters.type
        ) {
          return false;
        }

        if (filters.price && filters.price !== "any") {
          switch (filters.price) {
            case "middle":
              if (advert.offer.price < 10000 || advert.offer.price > 50000)
                return false;
              break;
            case "low":
              if (advert.offer.price > 10000) return false;
              break;
            case "high":
              if (advert.offer.price < 50000) return false;
              break;
          }
        }

        if (
          filters.rooms &&
          filters.rooms !== "any" &&
          advert.offer.rooms != filters.rooms
        ) {
          return false;
        }

        if (
          filters.guests &&
          filters.guests !== "any" &&
          advert.offer.guests != filters.guests
        ) {
          return false;
        }

        if (filterFeatures && filterFeatures > 0) {
          if (!advert.offer?.features) {
            return false;
          }
          if (
            !filterFeatures.every((feature) =>
              advert.offer.features.includes(feature)
            )
          ) {
            return false;
          }
        }

        return true;
      });
    }

    if (filterFeatures != null && filterFeatures.length > 0) {
      adverts = adverts.filter((advert) => {
        if (!advert.offer?.features) {
          return false;
        }
        return filterFeatures.every((filterFeature) =>
          advert.offer.features.some((feature) => feature === filterFeature)
        );
      });
    }

    createAdvertMarkup(adverts)
      .slice(0, 10)
      .forEach((advert) => {
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
}

drawPinMarkers();

export { mainPinMarker, map, drawPinMarkers };
